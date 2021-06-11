import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Config from '../../config.json';

class CommandListComponent extends Component {
    constructor() {
        super();
        this.state = {
            commande: [],
            destination: "",
        }

        this.checkDestination = this.checkDestination.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
        this.validateCommand = this.validateCommand.bind(this);
    }

    componentDidMount() {
        this.checkDestination();
    }

    checkDestination() {
        if(this.props.commande.commande.idTable === 0) {
            this.setState({
                destination: "A emporter"
            })
        } else {
            this.setState({
                destination: "Sur place"
            })
        }
    }

    goToDetails() {
        this.props.navigation.navigate('CommandeDetails', {
            listePlats: this.props.commande.listCommande,
        });
    }

    validateCommand() {
        this.props.validateOrder(this.props.commande.commande.id);
    }

    render() {
        return (
            <View style={styles.main}>
                <TouchableOpacity
                    style = { styles.main_container }
                    onPress = { this.goToDetails }
                >
                    <View style={styles.content_container}>
                        <View style={styles.text_container}>
                            <Text style={styles.destination_text}>{this.state.destination}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={ this.validateCommand }>
                        <Image source = {require('../../images_static/validation_icon.png')} style={styles.validate_order} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#faf3dd',
    },
    main_container: {
        flexDirection: 'row',
        height: 100,
        width: '95%',
        marginBottom: 10,
        margin: 10,
        borderWidth: 0.90,
        borderColor: '#ffa69e',
        borderRadius: 5,
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
        color: 'green',
        alignSelf: 'center',
        marginTop: 30,
    },
});

export default CommandListComponent;