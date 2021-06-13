import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class ReservationDone extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
                <View style={styles.main_view}>
                    <Text style={styles.textMerci}>
                        Votre reservation a bien été envoyée !
                        Vous pouvez retourner à la page d'accueil consulter notre carte
                    </Text>
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.navigate('LandingPage')}
                    >
                        <View style={styles.login_button}>
                            <Text style={styles.button_text}>
                                Retour à l'accueil
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
        backgroundColor: '#faf3dd',
        flex: 1,
    },
    textMerci: {
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
    },
    main_view:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%'
    }, 
    logo: {
        alignSelf: 'center',
        marginTop: 70,
    },
    login_button: {
        backgroundColor: "#5e6472",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 50
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default ReservationDone;