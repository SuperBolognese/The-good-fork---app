import React, { Component } from 'react';
import MenuListComponent from './MenuListComponent';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    renderItem={({item}) => <MenuListComponent dish_name={item.plat} description={item.description} prix={item.prix} navigation={this.props.navigation} id={item.carte_ID}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 50,
    },
    touchable: {
        justifyContent: 'flex-end',
        flex: 1
    },
    login_button: {
        marginBottom: 40,
        backgroundColor: "black",
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    }
})

export default MenuList;