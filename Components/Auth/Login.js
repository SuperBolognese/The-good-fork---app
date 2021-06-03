import React, { Component } from 'react';
import Config from '../../config.json';
import { StyleSheet, View, Text, Image, TextInput, Button} from 'react-native';
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
                    <Text
                        style={styles.title}
                    >
                        The good Fork
                    </Text>
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
                    <Button 
                        title='Se connecter'
                        onPress = {this._handleSubmit}
                    />
                    <Button
                        title="S'enregistrer"
                        onPress = {() => this.props.navigation.navigate('Register')}
                    ></Button>
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
        margin: 10
    },
    button: {
        marginTop: 10
    },
    container: {
        flex: 1,
    }
})

export default Login;