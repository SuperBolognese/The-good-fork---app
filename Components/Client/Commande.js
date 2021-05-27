import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CommandeListComponent from './CommandeListComponent';

class Commande extends Component {
    constructor() {
        super();
        this.state = {
            commande: [],
            total: 0
        }

        this.getCommandFromStorage = this.getCommandFromStorage.bind(this);
    }

    componentDidMount() {
        this.getCommandFromStorage().done();
    }

    async getCommandFromStorage() {
        const command = await AsyncStorage.getItem('commande');
        this.setState({
            commande: JSON.parse(command)
        });
        let fullTotal = 0;
        this.state.commande.forEach(element => {
            fullTotal += element.quantity * element.prix;
        })
        this.setState({
            total: fullTotal
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
                    renderItem={({item}) => <CommandeListComponent dish_name={item.name_plat} quantity = {item.quantity} prix = {item.prix} navigation={this.props.navigation} />}
                />
                <Text>Total : {this.state.total} €</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 50,
    },
})

export default Commande;