import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ReservationsWaiterListComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Text>Mme/Mr {this.props.customerName}</Text>
                <Text>Numéro de table : {this.props.tableID}</Text>
                <Text>Heure de réservation : {this.props.service}</Text>
                <Text>Nombre de personnes : {this.props.numberPersons}</Text>
            </View>
        )
    }
}

export default ReservationsWaiterListComponent;