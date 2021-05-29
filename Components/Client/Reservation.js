import React, { Component } from 'react';
import { View, Text } from 'react-native';

import DatePicker from '@dietime/react-native-date-picker';


class Reservation extends Component {
    constructor() {
        super();
        this.state = {
            date: ""
        }
    }

    render() {
        return( 
            <View>
                <Text> Réserver une table </Text>
                <DatePicker
                    startYear = {2021}
                    value={this.state.date}
                    onChange={(value) => this.setState({date : value})}
                />
            </View>
        )
    }
}

export default Reservation;