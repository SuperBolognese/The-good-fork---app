import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native';

class DishListComponent extends Component {

    callFun() {
        alert("Nice cock bro");
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    source={require('../../images_static/bonk_drone.png')}
                    style={styles.image}
                />
                <View style={styles.content_container}>
                    <Text style={styles.command_taker}>{this.props.dishName}</Text>
                    <TouchableOpacity onPress={this.callFun}>
                        <Image source = {require('../../images_static/validation_icon.png')} style={styles.validate_order} />
                    </TouchableOpacity>
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
        margin: 10,
        marginLeft:15,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 20
    },
    validate_order: {
        width: 40,
        height: 40,
        marginLeft: 30
    }
});

export default DishListComponent;