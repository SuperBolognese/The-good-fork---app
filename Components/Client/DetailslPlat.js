import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

class DetailsPlat extends Component {

    constructor(props) {
        super(props); 
        this.commande = [];
        this.qty = 0;
        this.isExist = false;

        this.addToBasket = this.addToBasket.bind(this);
    }

    componentDidMount() {
        this.getCommandFromStorage().done();
    }

    async getCommandFromStorage(){
        const commandAlready = await AsyncStorage.getItem('commande');
        if(commandAlready != null) {
            this.commande = JSON.parse(commandAlready);
        } else {
            this.commande = []
        }
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
        if(this.isUserConnected().done()) {
            this.props.navigation.navigate('Login');
        } else {
            this.commande.forEach(element => {
                if(element.id_plat === this.props.navigation.state.params.id) {
                    element.qty += 1;
                    this.isExist = true;
                } else {
                    this.isExist = false;
                }
            })
            if(!this.isExist) {
                const element = {
                    id_plat: this.props.navigation.state.params.id,
                    NamePlat: this.props.navigation.state.params.dish_name,
                    prix: this.props.navigation.state.params.prix,
                    qty: this.qty + 1,
                    imageUrl: this.props.navigation.state.params.imageUrl,
                    TypePlat: this.props.navigation.state.params.TypePlat
                }
                this.commande.push(element);
            }
            this.addCommandToStorage(this.commande);
        }
    }

    async addCommandToStorage(array) {
        AsyncStorage.setItem('commande', JSON.stringify(array));
    }

    render() {

        return(
            <View style={styles.main_container}>
                <View style = {styles.image_container }>
                    <Image
                        source={{uri: `data:image/jpeg;base64,${this.props.navigation.state.params.imageUrl}`}}
                        style={styles.image}
                    />
                </View>
                <View style= { styles.content }>
                    <Text
                        style = { styles.dish_title }
                    >{this.props.navigation.state.params.dish_name}
                    </Text>
                    <Text
                        style = { styles.description }
                    >
                        {this.props.navigation.state.params.description}
                    </Text>
                    <Text>
                        { this.props.navigation.state.params.prix}€
                    </Text>
                    <TextInput 
                        placeholder = "Quantité"
                        keyboardType = "numeric"
                        onChangeText = { (value) => this.qty = value }
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
    content: {
        marginTop: 20,
        backgroundColor:"#faf3dd",
    },
    dish_title: {
        alignSelf: 'center',
        fontSize: 30,
    },
    image_container:{
        width: '100%',
        height: '40%',
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
        marginTop: 70,
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
        fontSize: 15,
        fontWeight: 'bold',
    },
    touchable: {
        justifyContent: 'flex-end',
        flex: 1
    },
    main_container: {
        backgroundColor:"#faf3dd",
    }

})

export default DetailsPlat;