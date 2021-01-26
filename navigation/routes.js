import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Logout from '../screens/user/logout'
import Home from '../screens/home';
import Register from '../screens/user/register';
import Login from '../screens/user/login';
import Rituels from '../screens/application/rituels'
import HowAppWork from '../screens/howAppWork';
import ForgotPassword from '../screens/user/forgot-password'
import Test from '../screens/test'

const Stack = createStackNavigator();

const MyStack = () => {
  return (

    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
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
        <Stack.Screen 
          name="Logout" 
          component={Logout} 
          options={{ title: 'Déconnexion' }}
        />
        <Stack.Screen 
          name="Rituels" 
          component={Rituels}
        /><Stack.Screen 
        name="Forgot" 
        component={ForgotPassword}
        options={{ title: 'Déconnexion' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;