import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import Config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, ScrollView, StyleSheet,TouchableOpacity, Text } from 'react-native';
import DishListComponent from './DishListComponent';

//component dashboard des cooks qui affiche une liste avec toutes les commandes, par ordre d'arrivée 
class CookDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            commandes: []
        }
        this.token = "";

        this.getCommandesFromAPI = this.getCommandesFromAPI.bind(this);
    }

    componentDidMount() {
        this.getCommandesFromAPI();
    }

    async getCommandesFromAPI() {
        const token = await AsyncStorage.getItem('token');
        this.token = token;
        fetch(Config.baseURL + '/api/Commandes/getCommandeByState?state=0',{
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
        let listePlats = [];
        res.forEach(commande => {
            commande.listCommande.forEach(element => {
                if(element.typePlat != "Boisson" && element.state < 1) {
                    listePlats.push(element);
                }
            });
            commande.listCommande = listePlats;
            listePlats = []
        });
        
        if(res.length != 0){
            this.setState({
                commandes: res
            });
        }
    }

    async emptyStorage() {
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => {
            this.props.navigation.navigate('LandingPage');
        });
    }

    render() {
        return (
            <ScrollView style={styles.list_container}>
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress= {() => this.emptyStorage() }
                    >
                        <View style={styles.deconnexion}>
                            <Text style={styles.button_text}>
                                Déconnexion
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.liste}>
                    {this.state.commandes.map((item) => {
                        return( <DishListComponent token={this.token} listCommande={item.listCommande} key={item.commande.id} commande={item.commande} navigation={this.props.navigation} idTable={item.commande.idTable} /> )
                    })}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list_container:{
        backgroundColor: '#faf3dd',
    },
    liste: {
        marginTop: 20,
    },
    deconnexion: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "#5e6472",
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        margin: 10
    },
    view: {
        flexDirection: 'row',
        marginTop: 20, 
        justifyContent: 'center',
        alignSelf: 'center', 
        alignItems: 'center',
        marginBottom: 30,
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default CookDashboard;