import React, { Component } from 'react';
import MenuListComponent from './MenuListComponent';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import config from '../../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MenuList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            token: ""
        }

        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.getToken().done();
        this.apiCallForMenus();
    }

    async getToken() {
        const token = AsyncStorage.getItem('token');
        this.setState({
            token: token
        });
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
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.checkDishType(res);
        })
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <ScrollView style = {styles.main_container}>
                <View style = {styles.content_container}>
                    {this.state.data.map((item) => {
                        return( <MenuListComponent categorie= {item.categorie} dish_name={item.plat} description={item.description} prix={item.prix} navigation={this.props.navigation} id={item.carte_ID} key={item.carte_ID} imageUrl = {item.imageData}/> )
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    flatlist: {
        marginTop: 50,
        backgroundColor:"#faf3dd",
    },
    touchable: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    login_button: {
        top: 300,
        backgroundColor: "#5e6472",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15,
    },
    main_container: {
        backgroundColor:"#faf3dd",
    },
    content_container: {
        marginTop: 50
    }
})

export default MenuList;