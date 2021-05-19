import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
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
            console.log(res);
            this.props.navigation.navigate('Login');
        })
        .catch((error) => console.error(error))
    }

    render() {
        return(
            <View style={styles.content}>
                <NavBar />
                <View style={styles.main_container}>
                    <Text
                        style={styles.title}
                    >
                        The good Fork
                    </Text>
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
                            onChangeText = { (value) => this.password = value }
                            placeholder = "Mot de passe*"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            placeholder = "Répéter le mot de passe*"
                        />
                    </View>
                    <Button 
                        title='Créer un compte'
                        onPress = {() => this._handleSubmit()}
                    />
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
        flex: 1
    }
})

export default Register;