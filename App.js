import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import WaiterDashboard from './Components/Waiters/WaiterDashboard';
import CommandListComponent from './Components/Waiters/CommandListComponent';

export default function App() {
  return (
      <WaiterDashboard/>
  );
}
