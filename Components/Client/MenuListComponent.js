import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Config from '../../config.json';

class MenuListComponent extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.main_container}>
                    <Image
                        source={require('../../images_static/bonk_drone.png')}
                        style={styles.image}
                    />
                    <View style={styles.content_container}>
                        <Text style={styles.command_taker}>{this.props.dish_name}</Text>
                        <Text>{this.props.prix} €</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 130,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        flex: 1
    },
    image: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        margin: 20,
        marginLeft: 15,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column',
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 20
    },
});

export default MenuListComponent;