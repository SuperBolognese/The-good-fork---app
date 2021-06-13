import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Config from '../../config.json';

import {CalendarList} from "react-native-common-date-picker";
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Reservation extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            date: this.todayDate,
            lastName: "",
            services: [],
            selectedService: '',
            nbPersonnes: 1,
            details: "Non",
            visible: false
        }

        this.todayDate = new Date();
        const year = this.todayDate.getFullYear();
        const actualMonth = this.todayDate.getMonth()+1;
        const actualDay = this.todayDate.getDate();
        this.actualDate = year + "-"  + actualMonth + "-" + actualDay;
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

        const apiBody = {
            customerName: this.state.lastName,
            numberPersons: this.state.nbPersonnes,
            tableID: 0,
            serviceID: serviceIdTemp,
            date: this.state.date,
            Details: this.state.details
        }

        if(this.state.token == null) {
            Toast.show("Vous devez être connecté pour réserver une table", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true
            });
        } else {
            this.sendReservation(JSON.stringify(apiBody))
        }
    }

    sendReservation(body) {
        fetch(Config.baseURL + '/api/Bookings/NewBooking', {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(res => res.json())
        .then(res => {
            if(res.result === "Il n'y a plus de places pour cet horaire.") {
                Toast.show("Il n'y a plus de places pour cet horaire.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true
                });
            } else {
                this.props.navigation.navigate('ReservationDone');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return( 
            <View style={styles.container}>
                <Text
                    style = {styles.title}
                > Réserver une table </Text>
                <Text style={styles.textDate}>Selectionnez une date à laquelle vous souhaitez réserver : </Text>
                <View style={styles.datePick}>
                    <TouchableOpacity
                        onPress= {() => this.setState({visible: true})}
                        style={styles.touchable}
                    >
                        <View style={styles.login_button}>
                            <Text style={styles.button_text}>
                                Choisir une date
                            </Text>
                        </View>
                    </TouchableOpacity>
                <Modal animationType={'slide'} visible={this.state.visible}>
                    <CalendarList
                        minDate={this.actualDate}
                        maxDate="2050-06-01"
                        containerStyle={{marginTop: 20}}
                        cancel={() => this.setState({visible: false})}
                        confirm={data => {
                            this.setState({
                                date: data[0],
                                visible: false,
                            });
                        }}
                        />
                    </Modal>
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
                    <TextInput 
                        style={styles.input}
                        name="nbPersons"
                        keyboardType='numeric'
                        placeholder = "Combien de personnes ?"
                        onChangeText = { (value) => this.state.nbPersonnes = value }
                    />
                </View>
                <View style={styles.textNb}>
                    <TextInput 
                        style={styles.input}
                        name="nbPersons"
                        placeholder = "Des détails à nous donner ?"
                        onChangeText = { (value) => this.state.details = value }
                    />
                </View>

                <TouchableOpacity
                    onPress= {this.prepareBodyForAPI}
                    style={styles.touchable}
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
        justifyContent: 'space-between',
    },
    title: {
        marginLeft: 10,
        marginTop: 45,
        fontSize: 40,
        color: '#5e6472',
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
    input: {
        borderColor: 'black',
        borderRadius: 10
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
        color: 'white',
        fontSize: 15
    },
})

export default Reservation;