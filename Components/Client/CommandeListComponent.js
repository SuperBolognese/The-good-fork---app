import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class CommandeListComponent extends Component {
    constructor() {
        super();
    }

    callFun(){
        alert('Nice cock bro');
    }

    render() {
        return(
            <View style={styles.main_container}>
                <Image
                    source={{uri: `data:image/jpeg;base64,${this.props.imageUrl}`}}
                    style={styles.image}
                />
                <View style={styles.content_container}>
                    <Text style={styles.command_taker}>{this.props.dish_name}</Text>
                    <Text>{this.props.prix} €</Text>
                    <Text>x {this.props.quantity}</Text>
                </View>
                <TouchableOpacity onPress={this.callFun}>
                    <Image source = {require('../../images_static/delete_icon.png')} style={styles.validate_order} />
                </TouchableOpacity>
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
})

export default CommandeListComponent;