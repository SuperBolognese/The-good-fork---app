import React, {Component} from 'react';
import Config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommandListComponent from './CommandListComponent';

class WaiterDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: "",
            data: []
        };

        this.token ="";
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getCommandesFromAPI();
    }

    async getCommandesFromAPI() {
        const token = await AsyncStorage.getItem('token');
        this.token = token;
        fetch(Config.baseURL + '/api/Commandes/getListCommandeByState?state=0',{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            this.updateState(res);
        });
    }

    updateState(res) {
        this.setState({
            data: res
        });
    }

    validateOrder(commandId) {
        fetch(Config.baseURL + '/api/Commandes/StateListCommande?id=' + commandId, {
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
            <ScrollView style={styles.list_container}>
                <View style={styles.item1}>
                {this.state.data.map((item) => {
                    return ( <CommandListComponent token={this.token} idCommande={item.commande.id} navigation={this.props.navigation} commande={item} key={item.commande.id} validateOrder={this.validateOrder} /> )
                })}
                </View>
                <View style={styles.bottomTabBar}>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
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
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        flex:1,
        backgroundColor:'#faf3dd',
    },
    item1: {
        marginTop: 50,
    },
    bottomTabButton: {
        margin: 10,
        backgroundColor: '#5e6472',
        height: 50,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    bottomTabButton1: {
        margin: 10,
        backgroundColor: '#5e6472',
        height: 50,
        width: '25%', 
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 7,
        bottom: 0,
    },
    bottomTabButton2: {
        margin: 10,
        backgroundColor: '#5e6472',
        height: 50,
        width: '25%',
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

export default WaiterDashboard;