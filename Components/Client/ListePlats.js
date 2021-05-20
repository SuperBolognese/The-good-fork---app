import React, {cloneElement, Component} from 'react';

import { FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Plats from './Plats';

class ListePlats extends Component {
    constructor(){
        super()
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
            <View>
                <FlatList 
                    style={ styles.liste_plats }
                    data = {this.state.liste_plats}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Plats menuItem={item.dish} navigation={this.props.navigation} />}
                />
                <TouchableOpacity
                    onPress = {() => this.props.navigation.navigate('Login') }
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Se connecter pour commander
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    liste_plats: {
        marginTop: 50
    },
    login_button: {
        backgroundColor: "black",
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    button_text: {
        color: "white",
        fontSize: 15
    }
})

export default ListePlats;