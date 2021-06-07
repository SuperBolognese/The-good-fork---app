import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {cloneElement, Component} from 'react';
import Config from '../../config.json';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PlatsWaiter from './PlatsWaiter'

class ListePlatsWaiter extends Component {
    constructor(){
        super();
        this.state = {
            liste_plats: [],
            token: ""
        };

        this.apiCallForMenus = this.apiCallForMenus.bind(this);
        this.checkDishType = this.checkDishType.bind(this);
    }
    componentDidMount() {
        this.apiCallForMenus();
    }

    async apiCallForMenus () {
        const token = await AsyncStorage.getItem('token');
        this.setState({
            token: token
        })
        fetch(Config.baseURL + "/api/Menus", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.checkDishType(res);
        })
        .catch((error) => console.log(error))
    }

    checkDishType(res) {
        let dish_data = []
        res.forEach(element => {
            dish_data.push(element);
        });
        this.setState({
            liste_plats: dish_data
        });
    }

    render() {
        return (
            <ScrollView style = {styles.main_container}>
                <View style={styles.liste_plats}>
                    {this.state.liste_plats.map((item) => {
                        return(<PlatsWaiter menuItem={item.plat} navigation={this.props.navigation} key={item.carte_ID} imageUrl={item.imageData}/>)
                    })}
                </View>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Commande')} 
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Voir la commande
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomTabBar}>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                        onPress = {() => this.props.navigation.navigate('WaiterDashboard')}
                    >
                        <Text style={styles.button_text}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                    >
                        <Text style={styles.button_text}>Prendre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomTabButton}
                        onPress = {() => this.props.navigation.navigate('CommandsToSend')}
                    >
                        <Text style={styles.button_text}>Récupérer</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    liste_plats: {
        marginTop: 25,
    },
    login_button: {
        backgroundColor: "black",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
    main_container: {
        backgroundColor:"#faf3dd",
    },
    bottomTabButton: {
        margin: 10,
        backgroundColor: "black",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    bottomTabBar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
})

export default ListePlatsWaiter;