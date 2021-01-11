import React from 'react';
import Register from '../screens/user/register'
import Home from '../screens/home';
import Login from '../screens/user/login'
import HowAppWork from '../screens/howAppWork'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const RegisterStackNavigator = createStackNavigator({
  Register: { 
      screen: Register,
  }
})

const LoginStackNavigator = createStackNavigator({
  Connexion: { 
      screen: Login,
  }
})

const HomeStackNavigator = createStackNavigator({
  Acceuil: { 
      screen: Home,
  }
})

const HowAppWorkStackNavigator = createStackNavigator({
  HowAppWork: { 
      screen: HowAppWork,
  }
})



const TabNavigator = createMaterialBottomTabNavigator(
  {
    Acceuil: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-book'} />
          </View>
        ),
      }
    },
    Connexion: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-book'} />
          </View>
        ),
      }
    },
    HowAppWork: {
      screen: HowAppWorkStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-book'} />
          </View>
        ),
      }
    },
    Register: {
      screen: RegisterStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-book'} />
          </View>
        ),
      }

    }
  },
  {
    initialRouteName: 'Acceuil',
    activeColor: '#ffffff',
    inactiveColor: '#a3c2fa',
    barStyle: { backgroundColor: '#321aed' },
    tabBarLabel: {labeled: false}
  }
);

export default createAppContainer(TabNavigator);