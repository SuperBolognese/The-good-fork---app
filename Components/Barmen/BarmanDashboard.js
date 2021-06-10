import React, {Component} from 'react';
import Config from '../../config.json';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrinkListComponent from './DrinkListComponent';

//component pour le dashboard des barman affichant une liste du sub-component
class BarmanDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            commandes: []
        };

        this.getCommandesFromAPI = this.getCommandesFromAPI.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getCommandesFromAPI();
    }

    async getCommandesFromAPI() {
        const token = await AsyncStorage.getItem('token');
        this.token = token;
        fetch(Config.baseURL + '/api/Commandes/getListCommandeByState?state=1',{
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
                if(element.typePlat == "Boisson" && element.state < 1) {
                    listePlats.push(element);
                }
            });
            commande.listCommande = listePlats;
            listePlats = []
        });
        let listCommande = [];
        res.forEach(element => {
            if(element.listCommande.length != 0) {
                listCommande.push(element);
            }
            element = listCommande;
            listCommande = [];
        });
        this.setState({
            commandes: res
        })
    }

    render() {
        return (
            <ScrollView style={styles.list_container}>
                { this.state.commandes.map((item) => {
                    return ( <DrinkListComponent listCommande={item.listCommande} key={item.commande.id} commande={item.commande} navigation={this.props.navigation} tableId={item.commande.idTable} /> )
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 60
    }
})

export default BarmanDashboard;