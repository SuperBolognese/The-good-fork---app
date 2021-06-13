import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config.json';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ReservationsWaiterListComponent from './ReservationWaiterListComponent';

class ReservationsWaiter extends Component {
    constructor() {
        super();
        this.state = {
            reservations : []
        }
        this.token = "";

        this.getReservationsFromApi = this.getReservationsFromApi.bind(this);
        this.filterTodayBookings = this.filterTodayBookings.bind(this);
    }

    componentDidMount() {
        this.getReservationsFromApi();
    }

    async getReservationsFromApi() {
        const token = await AsyncStorage.getItem('token');
        this.token = token;
        fetch(Config.baseURL + '/api/Bookings', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
        .then(res => res.json())
        .then(res => {
            this.filterTodayBookings(res);
        })
    }

    filterTodayBookings(reservations) {
        const date = new Date();
        const year = (date.getFullYear());
        const month = (date.getMonth()+1);
        const day = (date.getDate());
        const todayDate = day + "-" +month+"-"+year;
        let todayBookings = []

        reservations.forEach(element => {
            if(element.date === todayDate) {
                todayBookings.push(element);
            }
        });

        this.setState({
            reservations: todayBookings
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <ScrollView style={StyleSheet.mainScroll}>
                    <View style={styles.main_container}>
                    <Text style={styles.textStyle}>Réservations du jour</Text>
                
                    {this.state.reservations.map((item) => {
                        return (<ReservationsWaiterListComponent key={item.id} customerName={item.customerName} tableID={item.tableID} service={item.serviceString} numberPersons={item.numberPersons} />)
                    })}
                    </View>
                    <View style={styles.bottomTabBar}>
                        <TouchableOpacity
                            style={styles.bottomTabButton}
                            onPress = {() => this.props.navigation.navigate('WaiterDashboard')}
                        >
                            <Text style={styles.button_text}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomTabButton1}
                            onPress = {() => this.props.navigation.navigate('ListePlatsWaiter')}
                        >
                            <Text style={styles.button_text}>Prendre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomTabButton2}
                            onPress = {() => this.props.navigation.navigate('CommandsToSend')}
                        >
                            <Text style={styles.button_text}>Récupérer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bottomTabButton3}
                            onPress = {() => this.props.navigation.navigate('ReservationsWaiter')}
                        >
                            <Text style={styles.button_text}>Réservation</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainScroll: {
        flex:1,
        backgroundColor: '#faf3dd',
    },
    main_container: {
        flex:1,
        backgroundColor: '#faf3dd',
    },
    textStyle: {
        marginTop: 50,
        fontSize: 20,
        marginLeft: 10,
    },
    bottomTabButton: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    bottomTabButton1: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%', 
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 7,
        bottom: 0,
    },
    bottomTabButton2: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
    },
    bottomTabButton3: {
        margin: 3,
        backgroundColor: '#5e6472',
        height: 50,
        width: '24%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 7,
    },
    bottomTabBar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button_text: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default ReservationsWaiter;