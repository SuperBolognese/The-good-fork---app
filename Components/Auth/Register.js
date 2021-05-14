import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button} from 'react-native';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            username: ""
        }
    }

    _loginUser(){
        console.log("CACA");
    }

    render() {
        return(
            <View style={styles.main_container}>
                <Text
                    style={styles.title}
                >
                    The good Fork
                </Text>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.input}
                        placeholder = "Nom*"
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.input}
                        placeholder = "Prénom*"
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.input}
                        placeholder = "Email*"
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.input}
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
                    onPress = {() => this._loginUser()}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
})

export default Register;