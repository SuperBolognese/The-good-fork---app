import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ListeCommandePlatsComponent from './ListeCommandePlatsComponent';

class CommandeDetails extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <View>
                 <FlatList 
                    style={styles.list_container}
                    data = {this.props.navigation.state.params.listePlats}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <ListeCommandePlatsComponent namePlat={item.namePlat} qty={item.qty}/>}
                />
            </View>
        )
    }
}

styles = StyleSheet.create({
    list_container: {
        marginTop: 50
    }
})

export default CommandeDetails;