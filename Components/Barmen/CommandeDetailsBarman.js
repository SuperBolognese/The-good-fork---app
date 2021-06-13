import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CommandeListComponent from './CommandeListComponent';
import Config from '../../config.json'

class CommandeDetailsBarman extends Component {
    constructor() {
        super();
        this.state = {
            commande: []
        }

        this.validateOrder = this.validateOrder.bind(this);
    }

    componentDidMount() {
        this.setState({
            commande: this.props.navigation.state.params.commande
        })
    }

    validateOrder(commandId) {
        fetch(Config.baseURL + '/api/Commandes/StateCommande?id=' + commandId, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.navigation.state.params.token
            }
        })
        .then(res => res.json())
        .then(res => {
            let commandes = this.state.commande
            this.state.commande.forEach(element => {
                if(element.id === commandId) {
                    let index = commandes.indexOf(element);
                    commandes.splice(index, 1);
                }
            });
            this.updateState(commandes)
        })
        .catch(error => console.log(error))
    }

    updateState(res) {
        this.setState({
            commande: res
        })
    }

    render() {
        return (
            <ScrollView style={styles.mainScroll}>
                <View style={styles.main_container}>
                    {this.state.commande.map((item) => {
                        return( <CommandeListComponent id={item.id} namePlat={item.namePlat} qty={item.qty} key={item.id} validateOrder={this.validateOrder}/>)
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainScroll: {
        backgroundColor: '#faf3dd',
    },
    main_container: {
        marginTop: 50,
    },
})

export default CommandeDetailsBarman;