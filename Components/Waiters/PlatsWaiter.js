import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PlatsWaiter extends Component {

    constructor() {
        super();
        this.commande = [];
        this.qty = 0;
        this.isExist = false;
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    source={{uri: `data:image/jpeg;base64,${this.props.imageUrl}`}}
                    style={styles.image}
                />
                <View style={styles.content_container}>
                    <Text style={styles.command_taker}>{this.props.menuItem}</Text>
                    <TouchableOpacity
                        onPress= { () => this.props.addToBasket(this.props.id, this.props.menuItem, this.props.prix, 0, this.props.imageUrl) }
                        style = {styles.touchable}
                    >
                        <View style={styles.login_button}>
                            <Text style={styles.button_text}>
                                Ajouter 1 à la commande
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 140,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 0.90,
        borderColor: "#ffa69e",
        flex: 1,
        borderRadius: 5,
        marginBottom: 10
    },
    image: {
        width: 120,
        height: 120,
        margin: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 20,
        color: "#5e6472",
    },
    destination_text: {
        fontSize: 20,
        color: 'green'
    },
    login_button: {
        marginTop: 10,
        backgroundColor: "black",
        width: 180,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
});

export default PlatsWaiter;