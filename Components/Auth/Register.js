import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import NavBar from '../Shared/Navbar';

class Register extends Component {

    constructor() {
        super();
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password ="";
    }

    _handleSubmit(event) {
        const userData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        };
        this._register(userData);
    }
 
    _register(userdata){
        fetch(Config.baseURL + "/api/Users/Register", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)  
        })
        .then(res => res.json())
        .then(res => {
            this.props.navigation.navigate('Login');//si c'est fait correctement, l'utilisateur est redirigé vers la page de login
        })
        .catch((error) => console.error(error))
    }

    render() {
        return(
            <View style={styles.content}>
                <View style={styles.main_container}>
                <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            onChangeText = { (value) => this.lastName = value }
                            placeholder = "Nom*"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            onChangeText = { (value) => this.firstName = value }
                            placeholder = "Prénom*"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            onChangeText = { (value) => this.email = value }
                            placeholder = "Email*"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry = {true}
                            onChangeText = { (value) => this.password = value }
                            placeholder = "Mot de passe*"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            secureTextEntry = {true}
                            placeholder = "Répéter le mot de passe*"
                        />
                    </View>
                    <TouchableOpacity
                        onPress= {this._handleSubmit}
                        style = {styles.touchable}
                    >
                        <View style={styles.login_button}>
                            <Text style={styles.button_text}>
                                S'enregistrer
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%'
    },
    logo: {
        top: -110,
    },
    input: {
        width: '80%',
        margin: 10
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10
    },
    content: {
        flex: 1,
        backgroundColor: '#faf3dd',
    },
    login_button: {
        backgroundColor: "#5e6472",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
})

export default Register;