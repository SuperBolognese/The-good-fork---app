import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

class LandingPage extends Component {

    constructor() {
        super();

        this.redirectToCalendar = this.redirectToCalendar.bind(this);
        this.redirectToCommande = this.redirectToCommande.bind(this);
    }

    redirectToCommande() {
        this.props.navigation.navigate('ListePlats');
    }

    redirectToCalendar() {
        this.props.navigation.navigate('BookTable');
    }

    render() {
        return (
            <View style = {styles.main_container}>
                <TouchableOpacity
                    onPress= {this.redirectToCalendar}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Sur place
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {this.redirectToCommande}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            A emporter
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    login_button: {
        marginBottom: 40,
        backgroundColor: "black",
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    }
})

export default LandingPage;