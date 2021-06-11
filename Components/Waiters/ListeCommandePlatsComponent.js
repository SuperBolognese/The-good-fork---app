import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListeCommandePlatsComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <View style={styles.main_container}>
                <View style={styles.namePlat}>
                    <Text style={styles.command_taker}>{this.props.namePlat}</Text>
                </View>
                <Text style={styles.qty}>x {this.props.qty}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: '#faf3dd',
        flexDirection: 'row',
        height: 130,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 0.90,
        borderColor: '#ffa69e',
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
    },
    command_taker: {
        fontSize: 25
    },
    qty: {
        fontSize: 50,
        margin: 20
    },
    namePlat: {
        width: '50%',
        margin: 20
    }
})

export default ListeCommandePlatsComponent; 