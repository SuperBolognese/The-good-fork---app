import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

class DishListComponent extends Component {
    constructor() {
        super();

        this.state = {
            destination: ""
        }

        this.checkDestination = this.checkDestination.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
    }

    goToDetails() {
        this.props.navigation.navigate('CommandeDetailsCook', {
            commande: this.props.listCommande
        });
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
        height: 130,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        flex: 1
    },
    image: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        margin: 10,
        marginLeft:15,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 20
    },
    validate_order: {
        width: 40,
        height: 40,
        marginLeft: 30
    }
});

export default DishListComponent;