import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ListeCommandePlatsComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <View style={styles.main_container}>
                <Text style={styles.command_taker}>{this.props.namePlat}        </Text>
                <Text styme={styles.qty}>x {this.props.qty}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 130,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    command_taker: {
        fontSize: 25
    },
    qty: {
        fontSize: 50
    }
})

export default ListeCommandePlatsComponent; 