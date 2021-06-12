import React, {cloneElement, Component} from 'react';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
            <ScrollView style = {styles.main_container}>
                <Text style = {styles.title}>Nos plats</Text>
                {this.state.liste_plats.map((item) => {
                    return (<Plats menuItem={item.dish} navigation={this.props.navigation} key={item.id}/>)
                })}
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Commande')} 
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Voir ma commande
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
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
        fontSize: 40,
        color: "#5e6472",
        fontWeight: 'bold',
    },
    login_button: {
        backgroundColor: "#5e6472",
        width: '80%',
        height: 50,
        borderRadius: 7,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
    main_container: {
        backgroundColor:"#faf3dd",
    },
})

export default ListePlats;