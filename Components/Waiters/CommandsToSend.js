import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CommandsToSendListComponent from './CommandsToSendListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from  '../../config.json';

class CommandsToSend extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            token: ""
        }

        this.updateState = this.updateState.bind(this);
        this.getCommandsToSend = this.getCommandsToSend.bind(this);
        this.validateOrder = this.validateOrder.bind(this);
    }

    componentDidMount() {
        this.getCommandsToSend();
    }

    async getCommandsToSend() {
        const token = await AsyncStorage.getItem('token');
        this.setState({
            token: token
        })
        fetch(Config.baseURL + '/api/Commandes/getCommandeByState?state=1',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.updateState(res);
        });
    }

    updateState(res) {
        aEnvoyer = [];
        res.forEach(element => {
            element.listCommande.forEach(plat => {
                plat.idTable = (element.commande.idTable);
                aEnvoyer.push(plat)
            });
        });

        this.setState({
            data: aEnvoyer
        });
    }

    validateOrder(commandId) {
        fetch(Config.baseURL + '/api/Commandes/StateCommande?id=' + commandId, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.getCommandsToSend();
        })
        .catch(error => console.log(error))
    }


    render() {
        return (
            <ScrollView style={styles.scrollMain}>
                <View style={styles.list_container}>
                    {this.state.data.map((item) => {
                        return(<CommandsToSendListComponent id={item.id} idTable={item.idTable} namePlat={item.namePlat} qty={item.qty} key={item.id } validateOrder={this.validateOrder} />)
                    })}
                </View>
                <View style={styles.bottomTabBar}>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                        onPress = {() => this.props.navigation.navigate('WaiterDashboard')}
                    >
                        <Text style={styles.button_text}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton1}
                        onPress = {() => this.props.navigation.navigate('ListePlatsWaiter')}
                    >
                        <Text style={styles.button_text}>Prendre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton2}
                        onPress = {() => this.props.navigation.navigate('CommandsToSend')}
                    >
                        <Text style={styles.button_text}>Récupérer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton3}
                        onPress = {() => this.props.navigation.navigate('ReservationsWaiter')}
                    >
                        <Text style={styles.button_text}>Réservation</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    scrollMain: {
        backgroundColor: '#faf3dd',
    },
    list_container: {
        flex: 1,
        backgroundColor: '#faf3dd',
        marginTop: 50
    },
    bottomTabButton: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    bottomTabButton1: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%', 
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 7,
        bottom: 0,
    },
    bottomTabButton2: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
    },
    bottomTabButton3: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '24%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
    },
    bottomTabBar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
})
export default CommandsToSend;