import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomePage from './src/components/HomePage/HomePage';
import ScanScreen from './src/components/ScanScreen/ScanScreen';
import ListItem from './src/components/ListItem/ListItem';
import test from './src/components/test/test';

const AppNavigator = createStackNavigator(
  {
    HomePage: HomePage,
    ScanScreen:ScanScreen,
    ListItem:ListItem,
    test:test
  },
  {
    initialRouteName: "HomePage"
  }
);

export default createAppContainer(AppNavigator);

