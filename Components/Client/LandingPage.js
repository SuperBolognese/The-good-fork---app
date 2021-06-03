import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

class LandingPage extends Component {

    constructor() {
        super();
    }

    async emptyStorage() {
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Reservation')}
               >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Sur place
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('ListePlats')}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            A emporter
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {() => this.emptyStorage().done() }
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Vider la commande
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Login')}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Page Login
                        </Text>
                    </View>
                </TouchableOpacity>
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
    login_button: {
        marginBottom: 40,
        backgroundColor: "black",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    }
})

export default LandingPage;