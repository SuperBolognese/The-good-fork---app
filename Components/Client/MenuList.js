import React, { Component, useState } from 'react';
import MenuListComponent from './MenuListComponent';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Plats from './Plats';

class MenuList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.apiCallForMenus();
    }

    checkDishType(res) {
        const main_category = this.props.navigation.state.params.dish_category;
        let dish_data = []
        res.forEach(element => {
            const category = element.categorie + 's';
            if(category === main_category) {
                dish_data.push(element);
            }
        });
        this.setState({
            data: dish_data
        })
        console.log(this.state.data);
    }

    apiCallForMenus () {
        fetch(config.baseURL + "/api/Menus", {
            method: "GET",
        })
        .then(res => res.json())
        .then(res => {
            this.checkDishType(res);
        })
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <View>
                <FlatList
                    style = {styles.flatlist}
                    data = {this.state.data}
                    keyExtractor={(item) => item.carte_ID.toString()}
                    renderItem={({item}) => <MenuListComponent dish_name={item.plat} description={item.description} prix={item.prix} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 50,
        marginBottom: 15
    }
})

export default MenuList;