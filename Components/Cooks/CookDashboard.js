import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DishListComponent from './DishListComponent';

class CookDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            donnees: [
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
                data = {this.state.donnees}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <DishListComponent dishName={item.name} destination={item.destination} />}
            />
        );
    }
}

// const styles = StyleSheet.create({
//     list_container: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

export default CookDashboard;