import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ReservationsWaiterListComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View style={styles.textStyle}>
                    <Text>Mme/Mr {this.props.customerName}</Text>
                    <Text>Numéro de table : {this.props.tableID}</Text>
                    <Text>Heure de réservation : {this.props.service}</Text>
                    <Text>Nombre de personnes : {this.props.numberPersons}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#faf3dd',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ffa69e',
        margin: 10,
    },
    textStyle: {
        margin: 10,
    },
    
})


export default ReservationsWaiterListComponent;