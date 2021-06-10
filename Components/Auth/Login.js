import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../Shared/Navbar';

class Login extends Component {

    constructor() {
        super();

        this.email = "";
        this.password = "";

        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(event) { //stocker les infos des TextInput lors du submit
        const userData = {
            email: this.email,
            password: this.password
        };
        this._loginUser(userData);
        event.preventDefault();
    }

    _loginUser(userdata){
        fetch(Config.baseURL + "/api/Users/Login", { //route de connexixon utilisateur
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)  
        })
        .then(res => res.json())
        .then(res => {
            this.setStorageValue('firstName', res.firstName);
            this.setStorageValue('lastName', res.lastName);
            this.setStorageValue('job', res.job);
            this.setStorageValue('token', res.token);
            this.setStorageValue('userId', res.clientID.toString())
            this.checkUserJob(res.job);
        })
        .catch((error) => console.error(error))
    }

    setStorageValue = async (key, value) => {//mettre les infos du user dans le localstorage
        try {
            await AsyncStorage.setItem(key, value)
        } catch(e) {
            console.log("Error : " + e);
        }
    }

    checkUserJob(job) {//redirection en fonction du type d'utilisateur
        if (job === "waiter") {
            this.props.navigation.navigate('WaiterDashboard')
        } else if (job === 'cook') {
            this.props.navigation.navigate('CookDashboard')
        } else if (job === 'barman') {
            this.props.navigation.navigate('BarmanDashboard')
        } else {
            this.props.navigation.navigate('LandingPage')
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            name="email"
                            placeholder = "Email*"
                            onChangeText = { (value) => this.email = value }
                            />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                            style={styles.input}
                            name="password"
                            secureTextEntry = {true}
                            placeholder = "Mot de passe*"
                            onChangeText = { (value) => this.password = value }
                            />
                    </View>
                    <TouchableOpacity
                        onPress= {this._handleSubmit}
                        style = {styles.touchable}
                    >
                        <View style={styles.login_button}>
                            <Text style={styles.button_text}>
                                Se connecter
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.navigate('Register')}
                        style = {styles.touchable}
                    >
                        <View style={styles.login_button1}>
                            <Text style={styles.button_text1}>
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
    input: {
        width: '80%',
        margin: 10
    },
    logo: {
        position: 'absolute',
        top:-110,
    },
    title: {
        marginBottom: 50,
        fontSize: 30
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%'
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10,
        top: 100,
    },
    
    button: {
        marginTop: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#faf3dd'
    },
    login_button: {
        backgroundColor: '#5e6472',
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        borderRadius: 7,
    },
    login_button1: {
        backgroundColor: '#5e6472',
        width: 450,
        height: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -575,
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
    button_text1: {
        color: "white",
        fontSize: 17,
    },
})

export default Login;