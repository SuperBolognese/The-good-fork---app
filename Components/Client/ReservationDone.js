import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class ReservationDone extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image source = {require('../../images_static/logo_small1.png')} style={styles.logo} />
                <Text style={styles.textMerci}>
                    Votre reservation a bien été envoyée !
                    Vous pouvez retourner à la page d'accueil consulter notre carte :)
                </Text>
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
        top: '30%',
        fontSize: 20,
    },
    logo: {
        alignSelf: 'center',
        marginTop: 70,
    },
})

export default ReservationDone;