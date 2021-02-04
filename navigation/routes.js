import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect} from 'react-redux'; 
import Logout from '../screens/user/logout'
import Home from '../screens/home';
import Account from '../screens/application/account';
import Stat from '../screens/application/stat';
import Register from '../screens/user/register';
import Login from '../screens/user/login';
import Rituels from '../screens/application/rituels'
import HowAppWork from '../screens/howAppWork';
import ForgotPassword from '../screens/user/forgot-password'
import Warroom from '../screens/application/warroom'
import Awards from '../screens/application/awards'
import Test from '../screens/test'

const Stack = createStackNavigator();

const MyStack = (props) => {
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
    {props.user.isLogged == true ?(
      <>
      <Stack.Screen 
      name="Logout" 
      component={Logout} 
      options={{ title: 'Déconnexion' }}
    />
    <Stack.Screen 
      name="Warroom" 
      component={Warroom} 
    />
    <Stack.Screen 
      name="Award" 
      component={Awards} 
    />
    <Stack.Screen 
      name="Rituels" 
      component={Rituels}
    />
     <Stack.Screen 
      name="Account" 
      component={Account} 
    />
    <Stack.Screen 
      name="Stat" 
      component={Stat}
    />
    </>):(<>
        
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
        name="Forgot" 
        component={ForgotPassword}
        options={{ title: 'Déconnexion' }}
      /></>)}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

mapDispatchToProps = {
  
}

mapStateToProps = (store)=>{
  return {
      user: store.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyStack);