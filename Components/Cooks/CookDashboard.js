import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import Config from '../../config.json';

import { FlatList, StyleSheet } from 'react-native';
import DishListComponent from './DishListComponent';

class CookDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            donnees: [
                {
                    name: "Gateau au chocolat",
                    destination: "A emporter",
                    id: '1'
                },
                {
                    name: "Hamburger",
                    destination: "Sur place",
                    id: '2'
                }
            ]
        };
    }

    render() {
        return (
            <FlatList 
                style = {styles.list_container}
                data = {this.state.donnees}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DishListComponent dishName={item.name} destination={item.destination} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 60
    }
})

export default CookDashboard;