import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-root-toast';

class LandingPage extends Component {

    constructor() {
        super();

        this.redirectUserIfConnected = this.redirectUserIfConnected.bind(this);
    }

    componentDidMount() {
        this.redirectUserIfConnected();
    }

    async redirectUserIfConnected() {//redirection en fonction du type d'utilisateur
        let job = await AsyncStorage.getItem('job');
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

    async emptyStorage() {
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert('success'));
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
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
        flex: 1,
        backgroundColor:"#faf3dd",
    },
    login_button: {
        marginBottom: 40,
        backgroundColor: "#5e6472",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
    logo: {
        alignItems: 'center',
        marginBottom: 150,

    }

})

export default LandingPage;