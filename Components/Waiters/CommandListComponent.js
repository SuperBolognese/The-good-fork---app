import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Config from '../../config.json';

class CommandListComponent extends Component {
    constructor() {
        super();
        this.state = {
            commande: [],
            destination: "",
        }

        this.checkDestination = this.checkDestination.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
        this.validateOrder = this.validateOrder.bind(this);
    }

    componentDidMount() {
        this.checkDestination();
    }

    checkDestination() {
        if(this.props.commande.commande.idTable === 0) {
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
        this.props.navigation.navigate('CommandeDetails', {
            listePlats: this.props.commande.listCommande,
        });
    }

    validateOrder() {
        fetch(Config.baseURL + '/api/Commandes/StateCommande?id=' + this.props.commande.commande.id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <TouchableOpacity
                style = { styles.main_container }
                onPress = { this.goToDetails }
            >
                <View style={styles.content_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.destination_text}>{this.state.destination}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={this.validateOrder }>
                    <Image source = {require('../../images_static/validation_icon.png')} style={styles.validate_order} />
                </TouchableOpacity>
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
        borderWidth: 1,
        borderColor: 'black',
        flex: 1
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column'
    },
    text_container:{
        flexDirection: 'column',
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 26
    },
    destination_text: {
        fontSize: 20,
        color: 'green'
    },
});

export default CommandListComponent;