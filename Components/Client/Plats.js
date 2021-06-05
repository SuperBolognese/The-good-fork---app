import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native';

class Plats extends Component {

    constructor() {
        super();
        this.navigateToMenuList = this.navigateToMenuList.bind(this);
    }

    navigateToMenuList() {
        this.props.navigation.navigate('MenuList', { dish_category: this.props.menuItem });
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.navigateToMenuList}
            >
                <View style={styles.main_container}>
                    <Image
                        source={{uri : "image"}}
                        style={styles.image}
                    />
                    <View style={styles.content_container}>
                            <Text style={styles.command_taker}>{this.props.menuItem}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
        fontSize: 26,
        color: "#5e6472",
    },
    destination_text: {
        fontSize: 20,
        color: 'green'
    }
});

export default Plats;