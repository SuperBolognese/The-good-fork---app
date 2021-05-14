import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button} from 'react-native';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            username: ""
        }
    }

    _loginUser(){
        console.log("IUI");
    }

    render() {
        return(
            <View style={styles.content}>
                <Text
                    style={styles.title}
                >
                    The good Fork
                </Text>
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
                <Button 
                    title='Se connecter'
                    onPress = {() => this._loginUser()}
                />
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
        flex: 1
    },
    inputView:{
        borderBottomWidth: 1,
        width: '80%',
        margin: 10
    },
    button: {
        marginTop: 10
    }
})

export default Login;