import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native';
import Config from '../../config.json';

class MenuListComponent extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={this.caca}
            >
                <View style={styles.main_container}>
                    <Image
                        source={{uri : "image"}}
                        style={styles.image}
                    />
                    <View style={styles.content_container}>
                        <Text style={styles.dish_name}>{this.props.dish_name}</Text>
                        <View>
                            <Text>Notes des utilisateurs : </Text>
                            <Text>4/5</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        height: 180,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        flex: 1
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        height: '75%',
        margin: 5,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column'
    }
});

export default MenuListComponent;