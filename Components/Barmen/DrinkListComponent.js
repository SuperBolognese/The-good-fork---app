import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native';
import { getActiveChildNavigationOptions } from 'react-navigation';

//component pour afficher une seule boisson
class DrinkListComponent extends Component {

    constructor() {
        super();
        this.state = {
            commande: [],
            destination: "",
        }

        this.checkDestination = this.checkDestination.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
    }

    componentDidMount() {
        this.checkDestination();
    }

    checkDestination() {
        if(this.props.commande.idTable === 0) {
            this.setState({
                destination: "A emporter"
            })
        } else {
            this.setState({
                destination: "Sur place"
            })
        }
    }

    goToDetails() {
        this.props.navigation.navigate('CommandeDetailsBarman', {
            commande: this.props.listCommande
        });
    }

    render() {
        return (
            <TouchableOpacity style={styles.main_container} onPress={this.goToDetails}>
                <View style={styles.content_container}>
                    <Text style={styles.command_taker}>{this.state.destination}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 100,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 0.9,
        borderColor: '#ffa69e',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column'
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 26
    }
});

export default DrinkListComponent;