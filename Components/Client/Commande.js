import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CommandeListComponent from './CommandeListComponent';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json'
import { createPortal } from 'react-dom';

class Commande extends Component {
    constructor() {
        super();
        this.state = {
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
    }

    componentDidMount() {
        this.getCommandFromStorage().done();
        this.getServiceHours();
        let hours = new Date().getHours();
    }

    async getCommandFromStorage() {
        const command = await AsyncStorage.getItem('commande');
        const userId = await AsyncStorage.getItem('userId');
        this.setState({
            commande: JSON.parse(command),
            userId: userId
        });
        let fullTotal = 0;
        this.state.commande.forEach(element => {
            fullTotal += element.qty * element.prix;
        })
        this.setState({
            total: parseFloat(fullTotal.toFixed(2))
        });
    }

    getServiceHours() {
        fetch(Config.baseURL + "/api/Services", {
            method: 'GET'
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
            services: hours
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
        })
        this.sendCommande(commande)
    }

    sendCommande(commande) {
        fetch(Config.baseURL + "/api/Commandes/NewCommande", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: commande
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <View>
                <Text>CACA</Text>
                <FlatList
                    style = {styles.flatlist}
                    data = {this.state.commande}
                    keyExtractor={(item) => item.id_plat.toString()}
                    renderItem={({item}) => <CommandeListComponent dish_name={item.name_plat} qty = {item.qty} prix = {item.prix} imageUrl = {item.imageUrl} navigation={this.props.navigation} />}
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