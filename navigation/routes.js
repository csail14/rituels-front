import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Footer from './footer'
import Home from '../screens/home';
import Register from '../screens/user/register';
import Login from '../screens/user/login';
import HowAppWork from '../screens/howAppWork';

const Stack = createStackNavigator();

const MyStack = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Bienvenu sur 4BRN' }}
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ title: 'Compte' }}
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Se connecter' }}
        />
        <Stack.Screen 
          name="HowAppWork" 
          component={HowAppWork} 
          options={{ title: 'Comment fonctionne 4BRN ?' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;