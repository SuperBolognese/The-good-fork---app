import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

class Payment extends Component {
    constructor () {
        super();
        this.state = {
            creditCardNumber: "",
            creditCardDate: "",
            creditCardCrypto: ""
        }
    }

    validateOrder() {

    }

    render() {
        return (
            <View style={styles.content}>
                <Text
                    style={styles.title}
                >
                    Informations de paiement
                </Text>
                <View style={styles.inputView}>
                    <Text>Credit card number</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType = 'numeric'
                        placeholder = "0000 0000 0000 0000"
                    />
                </View>
                <View style={styles.inputView}>
                    <Text>Expiricy date</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder = "MM/AA"
                    />
                </View>
                <View style={styles.inputView}>
                    <Text>Cryptogram</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType = 'numeric'
                        placeholder = "123"
                    />
                </View>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Payment') }
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Passer au paiement
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    input: {
        width: '80%',
        margin: 10
    },
    title: {
        marginBottom: 50,
        fontSize: 30
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10
    },
    login_button: {
        backgroundColor: "black",
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
})

export default Payment;