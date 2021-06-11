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
        this.details = "Rien";
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
            state: 0,
            Detail: this.details
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
            <ScrollView style={styles.scroll}>
                { this.state.commande.map((item) => {
                    return( <ListeCommandePlatsComponent typePlat={item.categorie} id={item.id_plat} namePlat={item.NamePlat} qty = {item.qty} prix = {item.prix} imageUrl = {item.imageUrl} navigation={this.props.navigation} key={item.id_plat} deleteCommandeElement = {this.deleteCommandeElement} />)
                })}
                <Text style={styles.textPrix}>Total : {this.state.total} €</Text>
                <Text style={styles.textNum}>Numéro de table : </Text>
                <Text style={styles.textDetail}>Des détails ? </Text>
                <TextInput 
                    style={styles.inputTable}
                    name="numTable"
                    keyboardType = "numeric"
                    placeholder = "No"
                    onChangeText = { (value) => this.numTable = value }
                />
                <TextInput 
                    style={styles.inputDetail}
                    name="numTable"
                    placeholder = "Details"
                    onChangeText = { (value) => this.details = value }
                />
                <Text style={styles.textService}>
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
                        <Text style={styles.button_text}>
                            Envoyer la commande
                        </Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#faf3dd',
        flexDirection: "column",
        flex: 1,
    },

    touchable: {
        marginTop: 10,
        borderRadius: 7,
        backgroundColor: "#5e6472",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: 175,
        marginBottom: 225,

    },
    button_text: {
        color: "white",
        fontSize: 17
    },
    textNum: {
        marginLeft: 10,
        marginTop: 70,
        fontSize: 20, 
    },
    inputTable: {
        borderBottomWidth: 0.5,
        width: '50%',
        marginTop: 40,
        fontSize: 20,
        left: '45%',
        bottom: 88,
    },
    textDetail: {
        top: 50,
        marginLeft: 10, 
        fontSize: 20,
    },
    inputDetail: {
        borderBottomWidth: 0.5,
        width: '60%',
        fontSize: 20,
        left: '35%',
        bottom: 38,

    },
    textPrix: {
        marginTop: 20,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textService: {
        marginLeft: 10,
        fontSize: 20,
    },
    hourPicker: {
        alignSelf: 'center',
        bottom: 15,
    },
})

export default SummaryCommande;