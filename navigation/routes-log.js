
import React from 'react';
import Home from '../screens/home';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


const RegisterStackNavigator = createStackNavigator({
  Register: { 
      screen: Register,
  }
})



  const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
                </View>
            ),
            }
        }
    },
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: '#321aed' },
      }
    );
    
    export default createAppContainer(TabNavigator);