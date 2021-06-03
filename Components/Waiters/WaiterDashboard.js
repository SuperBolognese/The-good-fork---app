import { useLinkProps } from '@react-navigation/native';
import React, {Component} from 'react';
import Config from '../../config.json';

import { FlatList, StyleSheet } from 'react-native';
import CommandListComponent from './CommandListComponent';

class WaiterDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        };

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getCommandesFromAPI();
    }

    getCommandesFromAPI() {
        console.log('CACA');
        fetch(Config.baseURL + '/api/Commandes',{
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            //this.updateState(res);
        })
    }

    updateState(res) {
        this.setState({
            data: res
        });
    }

    render() {
        return (
            <FlatList 
                style={styles.list_container}
                data = {this.state.donnees}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <CommandListComponent name={item.name} destination={item.destination} navigation={this.props.navigation} />}
            />
        );
    }
}

const styles = StyleSheet.create({
    list_container: {
        marginTop: 50
    }
})

export default WaiterDashboard;