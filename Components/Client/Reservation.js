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

        const date = this.state.date;
        const year = (date.getFullYear());
        const month = (date.getMonth()+1);
        const day = (date.getDate());
        const dateAEnvoyer = day + "-" +month+"-"+year;
        
        const apiBody = {
            customerName: this.state.lastName,
            numberPersons: this.state.nbPersonnes,
            tableID: 0,
            serviceID: serviceIdTemp,
            data: dateAEnvoyer
        }

        console.log(apiBody);
    }

    render() {
        return( 
            <View style={styles.container}>
                <Text
                    style = {styles.title}
                > Réserver une table </Text>
                <Text style={styles.textDate}>Selectionnez une date à laquelle vous souhaitez réserver : </Text>
                <View style={styles.datePick}>
                    <DatePicker
                        startYear = {2021}
                        height= {100}
                        value={this.state.date}
                        onChange={(value) => this.setState({date : value})}
                />
                </View>

                <View style={styles.pickheure}>
                    <Picker 
                        selectedValue={this.state.selectedService}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => this.setState({selectedService: itemValue})}
                    >
                        {this.state.services.map((item, index) => {
                            return (< Picker.Item label={item.hourOfService} value={item.hourOfService} key={item.id}/>);
                        })} 
                    </Picker>
                </View>

                <View style={styles.textNb}>
                    <Text style={styles.text1}>Nombre de personnes : </Text>
                    <Text style={styles.text2}>{this.state.nbPersonnes}</Text>
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
    container: {
        backgroundColor: '#faf3dd',
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        marginLeft: 10,
        marginTop: 45,
        fontSize: 40,
        color: "#5e6472",
        fontWeight: 'bold',
        marginBottom: 20,
    },
    datePick: {
        backgroundColor: '#faf3dd',
    },
    textDate: {
        marginBottom: 20,
        marginLeft: 10,
        marginTop: 35,
        fontSize: 17,
    },
    textNb: {

    },
    text1: {
        fontSize: 17,
        marginLeft: 10,
    },
    text2: {
        fontSize: 17,
        fontWeight: 'bold',
        bottom: 20,
        left: 200 
    },
    touchable: {
        marginBottom: 50,
    },  
    pickheure: {
        alignSelf: 'center',
        bottom: '10%',
    },
    login_button: {
        backgroundColor: '#5e6472',
        width: 250,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    button_text: {
        color: "white",
        fontSize: 15
    },
})

export default Reservation;