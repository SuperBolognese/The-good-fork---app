import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReservationDone extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Text>
                    Votre reservation a bien été envoyée !
                    Vous pouvez retourner à la page d'accueil consulter notre carte :)
                </Text>
            </View>
        )
    }
}

export default ReservationDone;