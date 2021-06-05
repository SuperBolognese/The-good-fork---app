import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CommandeListComponent from './CommandeListComponent';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json'

class Commande extends Component {
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

        this.fullBody = {};

        this.getCommandFromStorage = this.getCommandFromStorage.bind(this);
        this.prepareBodyForCommand = this.prepareBodyForCommand.bind(this);
        this.getServiceHours = this.getServiceHours.bind(this);
        this.deleteCommandeElement = this.deleteCommandeElement.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    componentDidMount() {
        this.getCommandFromStorage().done();
        this.getServiceHours();
        let hours = new Date().getHours();
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
        let serviceIdTemp = "";

        this.state.services.forEach(element => {
            if(element.hourOfService === this.state.selectedService){
                serviceIdTemp = element.id
            }
        })

        const commandData = {
            IDService: serviceIdTemp, 
            date: "oui",
            idCustomer: this.state.userId,
            idTable: 0,
            nbPerson: 0,
            state: 0  
        }

        let listPlats = this.state.commande;

        listPlats.forEach(plat => {
            delete plat.imageUrl;
            delete plat.prix;
            delete plat.name_plat;
            plat.Detail = "oui";
            plat.state = 0;
        });

        let commande =[];
        commande = JSON.stringify({
            commande: commandData,
            listCommande: listPlats
        });
        this.props.navigation.navigate('Payment', {
            commande: commande
        });
    }

    render() {
        return (
            <View>
                <Text>CACA</Text>
                <FlatList
                    style = {styles.flatlist}
                    data = {this.state.commande}
                    keyExtractor={(item) => item.id_plat.toString()}
                    renderItem={({item}) => <CommandeListComponent id={item.id_plat} dish_name={item.name_plat} qty = {item.qty} prix = {item.prix} imageUrl = {item.imageUrl} navigation={this.props.navigation} deleteCommandeElement = {this.deleteCommandeElement} />}
                />
                <Text>Total : {this.state.total} €</Text>
                <Text>
                    Heure à laquelle vous récupérez votre commande :
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
                            Ajouter au panier
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 50,
    },
    login_button: {
        backgroundColor: "black",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
    hourPicker: {
        alignItems: 'center',
        margin: 10
    }
})

export default Commande;