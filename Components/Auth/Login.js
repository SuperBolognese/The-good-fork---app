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
                            <Text style={styles.button_text}>
                                Se connecter
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.navigate('Register')}
                        style = {styles.touchable1}
                    >
                            <Text style={styles.button_text1}>
                                S'enregistrer
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        margin: 10,
    },
    logo: {
        top: '20%',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10,
        top: '40%',
    },
    
    button: {
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor:"#faf3dd",
        justifyContent: "space-between",
    },
    touchable: {
        backgroundColor: "#5e6472",
        width: '80%',
        height: 50,
        borderRadius: 7,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%',
    },
    touchable1: {
        backgroundColor: "#5e6472",
        width: '80%',
        height: 50,
        borderRadius: 7,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: '90%',
        marginTop: 20,
        marginBottom: 50,

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