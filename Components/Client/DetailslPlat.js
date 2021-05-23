import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

class DetailsPlat extends Component {

    constructor(props) {
        super(props); 
        this.commande = [];
        this.quantity = 0;

        this.addToBasket = this.addToBasket.bind(this);
    }

    componentDidMount() {
    }

    async isUserConnected() {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if(token != null) {
           return true;
        } else {
            return false;
        }
    }

    addToBasket() {
        if(!this.isUserConnected) {
            this.props.navigation.navigate('Login');
        } else {
            const element = {
                id_plat: this.props.navigation.state.params.id,
                name_plat: this.props.navigation.state.params.dish_name,
                quantity: this.quantity
            }
            this.commande.push(element);
        }
    }

    render() {

        return(
            <View>
                <View style = {styles.image_container }>
                    <Image
                        source={require('../../images_static/bonk_drone.png')}
                        style={styles.image}
                    />
                </View>
                <View style= { styles.main_container }>
                    <Text
                        style = { styles.dish_title }
                    >{this.props.navigation.state.params.dish_name}
                    </Text>
                    <Text
                        style = { styles.description }
                    >
                        {this.props.navigation.state.params.description}
                    </Text>
                    <TextInput 
                        placeholder = "Quantité"
                        keyboardType = "numeric"
                        onChangeText = { (value) => this.quantity = value }
                    />

                </View>
                <TouchableOpacity
                    onPress= {this.addToBasket}
                    style = {styles.touchable}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Ajouter au panier
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 15,
    },
    dish_title: {
        alignSelf: 'center',
        fontSize: 30
    },
    image_container:{
        width: '100%',
        height: '50%',
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined
    },
    description: {
        width: '95%',
        alignSelf: 'center',
        marginTop: 20
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
    },
    touchable: {
        justifyContent: 'flex-end',
        flex: 1
    },

})

export default DetailsPlat;