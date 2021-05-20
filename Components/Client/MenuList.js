import React, { Component, useState } from 'react';
import MenuListComponent from './MenuListComponent';
import { FlatList, StyleSheet } from 'react-native';
import config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MenuList extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.apiCallForMenus().done();
    }

    checkDishType(res, main_category) {
        res.forEach(element => {
            if(element.category === main_category) {
                this.state.data.push(element);
                console.log(this.state.data);
            }
        });
    }

    async apiCallForMenus () {
        const value = await AsyncStorage.getItem('token');
        fetch(config.baseURL + "/api/Menus", {
            method: "GET",
            headers:{
                'Authorization' : 'Bearer '+ value
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.checkDishType(res, 'entree');
        })
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <FlatList 
                data = {this.state.data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <MenuListComponent dish_name={item.dish_name} />}
            />
        )
    }
}

export default MenuList;