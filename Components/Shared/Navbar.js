import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class NavBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>The Good Fork</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        backgroundColor: 'teal',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35
    }
})

export default NavBar;