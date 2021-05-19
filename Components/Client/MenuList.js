import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import Config from '../../config.json';

import { FlatList, StyleSheet } from 'react-native';
import MenuListComponent from './MenuListComponent';
import Plats from './Plats';

class MenuList extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [
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
            ]
        };
    }

    // componentDidMount() {
    //     fetch(Config.baseURL + '/api/Menus', {
    //         method: "GET"
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //         this.setState({
    //             data: res
    //         });
    //     })
    //     .catch((error) => console.error(error));
    // }

    render() {
        return (
            <FlatList 
                data = {this.state.data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <Plats menuItem={item.dish} />}
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

export default MenuList;