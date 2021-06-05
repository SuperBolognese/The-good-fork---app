import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json';

import DatePicker from '@dietime/react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Reservation extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            date: "",
            lastName: "",
            services: [],
            selectedService: '',
            nbPersonnes: 1
        }

        this.prepareBodyForAPI = this.prepareBodyForAPI.bind(this);
    }

    async getElementsFromStorage() {
        const lastName = await AsyncStorage.getItem('lastName');
        const token = await AsyncStorage.getItem('token');
        this.setState({
            lastName: lastName,
            token: token
        })
    }

    componentDidMount() {
        this.getElementsFromStorage().done();
        this.getServiceHours();
        const data = new Date().parse();
        console.log(data);
    }

    getServiceHours() {
        fetch(Config.baseURL + "/api/Services", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
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

    prepareBodyForAPI() {
        let serviceIdTemp = "";

        this.state.services.forEach(element => {
            if(element.hourOfService === this.state.selectedService){
                serviceIdTemp = element.id
            }
        })
        console.log('CACA');
        console.log(serviceIdTemp);

        const apiBody = {
            customerName: this.state.lastName,
            numberPersons: this.state.nbPersonnes,
            tableID: 0,
            serviceID: serviceIdTemp
        }

        //console.log(apiBody);
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
                    selectedValue={this.state.selectedService}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedService: itemValue})}
                >
                    {this.state.services.map((item, index) => {
                        return (< Picker.Item label={item.hourOfService} value={item.hourOfService} key={item.id}/>);
                    })} 
                </Picker>

                <View>
                    <Text>Nombre de personnes : </Text>
                    <Text>{this.state.nbPersonnes}</Text>
                </View>

                <TouchableOpacity
                    onPress= {() => this.prepareBodyForAPI() }
                    style = {styles.touchable}
                >
                    <View style={styles.login_button}>
                        <Text style={styles.button_text}>
                            Réserver
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
    touchable: {
        marginTop: 400,
    },  
    login_button: {
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

export default Reservation;