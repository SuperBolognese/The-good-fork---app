import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ListeCommandePlatsComponent from './ListeCommandePlatsComponent';

class CommandeDetails extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <ScrollView>
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
    list_container: {
        marginTop: 50
    }
})

export default CommandeDetails;