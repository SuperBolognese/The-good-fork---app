import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import CommandeListComponent from './CommandeListComponent';
import Config from '../../config.json'

class CommandeDetailsCook extends Component {
    constructor() {
        super();

        this.validateOrder = this.validateOrder.bind(this);
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
            <ScrollView style={styles.mainScroll}>
                <View style={styles.main_container}>
                    {this.props.navigation.state.params.commande.map((item) => {
                        console.log(item);
                        return( <CommandeListComponent id={item.id} namePlat={item.namePlat} qty={item.qty} key={item.id} validateOrder={this.validateOrder}/>)
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainScroll: {
        backgroundColor: '#faf3dd'
    },
    main_container: {
        marginTop: 50,
    },
})
export default CommandeDetailsCook;