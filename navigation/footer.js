import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Footer = (props) =>{
    const navigation = props.navigation
        return(
            <View style={styles.container}>
                <Button
                    title="Acceuil"
                onPress={() => navigation.navigate('Home')}
                />
                <Button
                    title="Détails"
                onPress={() => navigation.navigate('HowAppWork')}
                />
                <Button
                    title="S'enregister"
                onPress={() => navigation.navigate('Register')}
                />
                <Button
                    title="Se connecter"
                onPress={() => navigation.navigate('Login')}
                />
                
            </View>
            
        )


}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    button: {
        paddingTop:5,
        color : "white",
        height:wp('5%')
    }
  });
const mapDispatchToProps = {
 
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Footer);