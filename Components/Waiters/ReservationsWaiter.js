import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../config.json';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
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
})

export default ReservationsWaiter;