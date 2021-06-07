import React, {Component} from 'react';
import Config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommandListComponent from './CommandListComponent';

class WaiterDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: "",
            data: []
        };

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getCommandesFromAPI();
    }

    async getCommandesFromAPI() {
        const token = await AsyncStorage.getItem('token');
        this.setState({
            token: token
        })
        fetch(Config.baseURL + '/api/Commandes/getCommandeByState?state=0',{
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

    render() {
        return (
            <View>
                <FlatList 
                    style={styles.list_container}
                    data = {this.state.data}
                    keyExtractor={(item) => item.commande.id.toString()}
                    renderItem={({item}) => <CommandListComponent idCommande={item.commande.id} token={this.state.token} navigation={this.props.navigation} commande={item} key={item.commande.id}/>}
                />
                <View style={styles.bottomTabBar}>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                    >
                        <Text style={styles.button_text}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                        onPress = {() => this.props.navigation.navigate('ListePlatsWaiter')}
                    >
                        <Text style={styles.button_text}>Prendre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                        onPress = {() => this.props.navigation.navigate('CommandsToSend')}
                    >
                        <Text style={styles.button_text}>Récupérer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 50
    },
    bottomTabButton: {
        margin: 10,
        backgroundColor: "black",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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