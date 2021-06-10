import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Config from '../../config.json';

class MenuListComponent extends Component {

    constructor(props){
        super(props);
        this.goToDetails = this.goToDetails.bind(this);
    }

    goToDetails() {
        this.props.navigation.navigate('DetailsPlat', {
            dish_name: this.props.dish_name,
            description: this.props.description,
            prix: this.props.prix,
            id: this.props.id,
            imageUrl: this.props.imageUrl,
            TypePlat: this.props.categorie
        })
    }

    render() {
        return (
            <TouchableOpacity
                onPress = { this.goToDetails }
            >
                <View style={styles.main_container}>
                    <Image
                        source={{uri: `data:image/jpeg;base64,${this.props.imageUrl}`}}
                        style={styles.image}
                    />
                    <View style={styles.content_container}>
                        <Text style={styles.command_taker}>{this.props.dish_name}</Text>
                        <Text>{this.props.prix} €</Text>
                    </View>
                </View>
            </TouchableOpacity>
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