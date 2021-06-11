import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
            console.log(res);
            this.getCommandesFromAPI();
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
        backgroundColor: '#faf3dd'
    },
})
export default CommandsToSend;