import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import ListeCommandePlatsComponent from './ListeCommandePlatsComponent';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json';

class SummaryCommande extends Component {
    constructor() {
        super();
        this.state = {
            token: "",
            commande: [],
            total: 0,
            services: [],
            userId: 0,
            selectedService: ""
        }
        this.numTable = 0;
        this.fullBody = {};

        this.getCommandFromStorage = this.getCommandFromStorage.bind(this);
        this.prepareBodyForCommand = this.prepareBodyForCommand.bind(this);
        this.deleteCommandeElement = this.deleteCommandeElement.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.getServiceHours =  this.getServiceHours.bind(this);
    }

    componentDidMount() {
        this.getCommandFromStorage().done();
    }

    calculateTotal() {
        let fullTotal = 0;
        this.state.commande.forEach(element => {
            fullTotal += element.qty * element.prix;
        })
        this.setState({
            total: parseFloat(fullTotal.toFixed(2))
        });
    }

    async getCommandFromStorage() {
        const command = await AsyncStorage.getItem('commande');
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        console.log(command);
        this.setState({
            commande: JSON.parse(command),
            userId: userId,
            token: token
        });
        if (this.state.commande) {
            this.calculateTotal();
        }
        this.getServiceHours();
    }

    deleteCommandeElement(id) {
        let commande = this.state.commande;
        commande.forEach(element => {
            if(element.id_plat === id) {
                let index = commande.indexOf(element);
                commande.splice(index, 1);
            }
        });
        this.setState({
            commande: commande
        });
        this.calculateTotal();
        this.changeStorageValue(this.state.commande);
    }

    async changeStorageValue(commande) {
        AsyncStorage.setItem('commande', JSON.stringify(commande));
    }

    getServiceHours() {
        fetch(Config.baseURL + "/api/Services", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.addHoursToState(res);
        })
    }

    addHoursToState(res) {
        let currentHour = new Date().getHours();
        let hours = [];

        res.forEach(element => {
            if(element.hourOfService.substring(0,2) >= currentHour) {
                hours.push(element);
            }
        });
        this.setState({
            services: hours,
        });
    }


    prepareBodyForCommand() {
        const date = new Date();
        const year = (date.getFullYear());
        const month = (date.getMonth()+1);
        const day = (date.getDate());
        const dateAEnvoyer = day + "-" +month+"-"+year;

        let serviceIdTemp = "";

        this.state.services.forEach(element => {
            if(element.hourOfService === this.state.selectedService){
                serviceIdTemp = element.id
            }
        });

        const commandData = {
            IDService: serviceIdTemp, 
            date: dateAEnvoyer,
            idCustomer: this.state.userId,
            idTable: this.numTable,
            nbPerson: 0,
            state: 0  
        }

        let listPlats = this.state.commande;

        listPlats.forEach(plat => {
            delete plat.imageUrl;
            delete plat.prix;
            plat.Detail = "oui";
            plat.state = 0;
        });

        let commande =[];
        commande = JSON.stringify({
            commande: commandData,
            listCommande: listPlats
        });

        this.sendCommande(commande);
    }

    async emptyCommande() {
        AsyncStorage.removeItem('commande');
    }

    sendCommande(commande) {
        fetch(Config.baseURL + "/api/Commandes/NewCommande", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: commande
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.emptyCommande();
            Toast.show('Commande envoyée avec succès !', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
            });
            this.props.navigation.navigate('WaiterDashboard');
        })
        .catch(error => {
            console.log(error);
            Toast.show("La commande n'a pas pu être envoyée :(", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
            });
        });
    }


    render() {
        return( 
            <ScrollView>
                <Text>CACA</Text>
                { this.state.commande.map((item) => {
                    return( <ListeCommandePlatsComponent id={item.id_plat} namePlat={item.NamePlat} qty = {item.qty} prix = {item.prix} imageUrl = {item.imageUrl} navigation={this.props.navigation} key={item.id_plat} deleteCommandeElement = {this.deleteCommandeElement} />)
                })}
                <Text>Total : {this.state.total} €</Text>
                <TextInput 
                    style={styles.input}
                    name="numTable"
                    keyboardType = "numeric"
                    placeholder = "Numéro de table"
                    onChangeText = { (value) => this.numTable = value }
                />
                <Text>
                    Sélectionner le service : 
                </Text>
                 <View style={styles.hourPicker}>
                    <Picker
                        selectedValue={this.state.selectedService}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedService: itemValue})}
                    >
                        {this.state.services.map((item, index) => {
                            return (< Picker.Item label={item.hourOfService} value={item.hourOfService} key={item.id}/>);
                        })} 
                    </Picker>
                </View>
                <TouchableOpacity
                    onPress= {this.prepareBodyForCommand}
                    style = {styles.touchable}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Envoyer la commande
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    login_button: {
        marginTop: 10,
        backgroundColor: "black",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 17
    },
})

export default SummaryCommande;