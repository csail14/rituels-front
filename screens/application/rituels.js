import React, { useState, useEffect, useRef } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';

import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { NavigationContainer,useIsFocused  } from '@react-navigation/native';
import HeaderLog from '../../navigation/header-log'

const Rituels = (props)=>{
 
  
    return (

      
        <View style={styles.container}>
          <HeaderLog screen='Rituels' navigation={props.navigation}/>
            <ImageBackground source={background} style={styles.image}>
            <Text style={styles.title}>Rituels</Text>
         
            <Text>Hello</Text>
            </ImageBackground>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      color: "white"
    },
    text: {
        color: 'white',
        textAlign: 'center'
    },
    scrollContainer: {
      width: wp('100%'),
      textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: wp('60%'),
      height: 40,
      marginBottom: 15,
      marginLeft: wp('20%'),
      paddingLeft: wp('5%')
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    button: {
      backgroundColor: "#321aed",
      width: wp('40%'),
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: wp('30%'),
      marginTop: 10
    },
    buttonText: {
        color: "white"
    },
    commande: {
        flex:1
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp('10%'),
    }, 
    checkBox: {
        flex: 1,
    },
    validateContainer: {
        flex: 3
    }
  });


export default Rituels;