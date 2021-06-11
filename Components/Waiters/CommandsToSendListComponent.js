import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class CommandsToSendListComponent extends Component {
    constructor() {
        super();
        this.state = {
            destination: "",
        }

        this.checkDestination = this.checkDestination.bind(this);
        this.validateCommand = this.validateCommand.bind(this);
    }

    componentDidMount() {
        this.checkDestination();
    }

    checkDestination() {
        if(this.props.idTable === 0) {
            this.setState({
                destination: "A emporter"
            })
        } else {
            this.setState({
                destination: "Numéro de table : " + this.props.idTable
            })
        }
    }

    validateCommand() {
        this.props.validateOrder(this.props.id);
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View style={styles.namePlat}>
                    <Text style={styles.command_taker}>{this.props.namePlat}</Text>
                    <Text>{this.state.destination}</Text>
                </View>
                <Text style={styles.qty}>x {this.props.qty}</Text>
                <TouchableOpacity onPress={ this.validateCommand }>
                    <Image source = {require('../../images_static/validation_icon.png')} style={styles.validate_order} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#faf3dd',
        flexDirection: 'row',
        height: 130,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 0.90,
        borderColor: '#ffa69e',
        flex: 1,
        alignItems: 'center',
    },
    command_taker: {
        fontSize: 25
    },
    qty: {
        fontSize: 50,
        margin: 20
    },
    namePlat: {
        width: '50%',
        margin: 20,
        flexDirection: 'column'
    }
})

export default CommandsToSendListComponent; 