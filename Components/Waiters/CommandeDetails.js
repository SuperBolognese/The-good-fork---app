import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ListeCommandePlatsComponent from './ListeCommandePlatsComponent';

class CommandeDetails extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <ScrollView style={styles.scrollV}>
                <View style={styles.list_container}>
                    {this.props.navigation.state.params.listePlats.map((item) => {
                        return(<ListeCommandePlatsComponent namePlat={item.namePlat} qty={item.qty} key={item.id }/>)
                    })}
                </View>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    scrollV: {
        backgroundColor: '#faf3dd',
    },
    list_container: {
        flex:1,
        backgroundColor: '#faf3dd',
        marginTop: 50,
    }
})

export default CommandeDetails;