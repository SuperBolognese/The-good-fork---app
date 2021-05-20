import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native';
import { getActiveChildNavigationOptions } from 'react-navigation';

class DrinkListComponent extends Component {

    callFun(){
        alert('Nice cock bro');
    }

    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    source={{uri : "image"}}
                    style={styles.image}
                />
                <View style={styles.content_container}>
                    <Text style={styles.command_taker}>{this.props.drink}</Text>
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
        margin: 20,
        marginLeft: 15,
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
        fontSize: 20,
        marginRight: 20
    },
});

export default DrinkListComponent;