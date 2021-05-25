import React, {cloneElement, Component} from 'react';

import { FlatList, StyleSheet, View, Text } from 'react-native';
import Plats from './Plats';

class ListePlats extends Component {
    constructor(){
        super();
        this.state = {
            liste_plats: [
                {
                    dish: "Entrées",
                    id:"1"
                },
                {
                    dish: "Plats",
                    id: "2"
                },
                {
                    dish: "Desserts",
                    id: "3"
                },
                {
                    dish: "Boissons",
                    id: "4"
                }
            ],
        };
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <Text style = {styles.title}>Nos plats</Text>
                <FlatList 
                    style={ styles.liste_plats }
                    data = {this.state.liste_plats}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Plats menuItem={item.dish} navigation={this.props.navigation} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    liste_plats: {
        marginTop: 20,
    },
    title: {
        marginLeft: 10,
        marginTop: 45,
        fontSize: 50
    }
})

export default ListePlats;