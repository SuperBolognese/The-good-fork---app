import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Payment extends Component {
    constructor () {
        super();
        this.state = {
            creditCardNumber: "",
            creditCardDate: "",
            creditCardCrypto: "",
            token: ""
        }

        this.onSubmitPayment = this.onSubmitPayment.bind(this);
        this.isUserConnected = this.isUserConnected.bind(this);
    }

    componentDidMount() {
        this.isUserConnected().done();
        this.isUserConnected();
    }

    onSubmitPayment() {
        this.sendCommande(this.props.navigation.state.params.commande);
    }

    async isUserConnected() {
        const token = await AsyncStorage.getItem('token');
        this.setState({
            token: token
        });
    }

    async emptyCommande() {
        AsyncStorage.removeItem('commande');
    }

    sendCommande(commande) {
        console.log(commande);
        fetch(Config.baseURL + "/api/Commandes/NewCommande", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: commande
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.emptyCommande();
            Toast.show('Commande envoyée avec succès !', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
            });
        })
        .catch(error => {
            console.log(error);
            Toast.show("La commande n'a pas pu être envoyée :(", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
            });
        });
    }

    render() {
        return (
            <View style={styles.content}>
                 <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
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
                    onPress= {() => this.onSubmitPayment() }
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Valider
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
    logo: {
        position: 'absolute',
        top: 80,
    },
    title: {
        marginBottom: 50,
        fontSize: 30,
        color: '#5e6472',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#faf3dd',
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10
    },
    login_button: {
        backgroundColor: "#5e6472",
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 150,
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
})

export default Payment;