import React, {Component} from 'react';
import Config from '../../config.json';
import { FlatList, StyleSheet, View } from 'react-native';
import DrinkListComponent from './DrinkListComponent';

//component pour le dashboard des barman affichant une liste du sub-component
class BarmanDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [
                {
                    name: "Hamburger",
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
                data = {this.state.data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DrinkListComponent drink={item.name} destination={item.destination} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 60
    }
})

export default BarmanDashboard;