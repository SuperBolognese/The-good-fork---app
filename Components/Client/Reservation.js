import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json';

import DatePicker from '@dietime/react-native-date-picker';

class Reservation extends Component {
    constructor() {
        super();
        this.state = {
            date: "",
            services: [],
            selectedService: ''
        }
    }

    componentDidMount() {
        this.getServiceHours();
    }

    getServiceHours() {
        fetch(Config.baseURL + "/api/Services", {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            this.addHoursToState(res);
        })
    }

    addHoursToState(res) {
        let hours = [];
        res.forEach(element => {
            hours.push(element);
        });
        this.setState({
            services: hours
        });
    }

    render() {
        return( 
            <View>
                <Text
                    style = {styles.title}
                > Réserver une table </Text>
                <DatePicker
                    startYear = {2021}
                    height= {100}
                    value={this.state.date}
                    onChange={(value) => this.setState({date : value})}
                />
                <Text>Selectionner à quelle heure vous souhaitez venir : </Text>
                <Picker
                    selectedValue={this.state.services}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedService: itemValue})}
                >
                    {this.state.services.map((item, index) => {
                        return (< Picker.Item label={item.hourOfService} value={item.hourOfService} key={item.id}/>);
                    })} 
                </Picker>
                <TouchableOpacity
                    onPress= {() => this.props.navigation.navigate('Payment') }
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Passer au paiement
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },
    login_button: {
        backgroundColor: "black",
        width: '80%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
})

export default Reservation;