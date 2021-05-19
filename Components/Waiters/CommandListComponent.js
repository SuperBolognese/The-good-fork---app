import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

class CommandListComponent extends Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Image
                    source={{uri : "image"}}
                    style={styles.image}
                />
                <View style={styles.content_container}>
                    <View style={styles.text_container}>
                        <Text style={styles.command_taker}>{this.props.name}</Text>
                        <Text style={styles.destination_text}>{this.props.destination}</Text>
                    </View>
                    <Button 
                        title='Valider'
                    />
                </View>
            </View>
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
        width: 150,
        height: 150,
        margin: 5,
        backgroundColor: 'grey'
    },
    content_container: {
        flex: 1,
        margin: 5,
        flexDirection: 'column'
    },
    text_container:{
        flexDirection: 'column',
    },
    command_taker: {
        fontWeight: 'bold',
        fontSize: 26
    },
    destination_text: {
        fontSize: 20,
        color: 'green'
    }
});

export default CommandListComponent;