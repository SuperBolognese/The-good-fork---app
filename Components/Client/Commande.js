import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
            total: parseFloat(fullTotal.toFixed(2))
        });
    }

    sendCommande() {
        
    }

    render() {
        return (
            <View>
                <Text>CACA</Text>
                <FlatList
                    style = {styles.flatlist}
                    data = {this.state.commande}
                    keyExtractor={(item) => item.id_plat.toString()}
                    renderItem={({item}) => <CommandeListComponent dish_name={item.name_plat} quantity = {item.quantity} prix = {item.prix} imageUrl = {item.imageUrl} navigation={this.props.navigation} />}
                />
                <Text>Total : {this.state.total} €</Text>
                <TouchableOpacity
                    onPress= {this.addToBasket}
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
        marginBottom: 40,
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
    }
})

export default Commande;