import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import Config from '../../config.json';

import { FlatList, StyleSheet } from 'react-native';
import CommandListComponent from './CommandListComponent';

class WaiterDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            donnees: [
                {
                    name: "Mr Perineau",
                    destination: "A emporter",
                    id: '1'
                },
                {
                    name: "Mr Bourguignat",
                    destination: "Sur place",
                    id: '2'
                }
            ]
        };
    }

    render() {
        return (
            <FlatList 
                style={styles.list_container}
                data = {this.state.donnees}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <CommandListComponent name={item.name} destination={item.destination} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 50
    }
})

export default WaiterDashboard;