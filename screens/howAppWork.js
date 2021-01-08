import React, { useState, useEffect } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../assets/rituals-background.jpg';
import video1 from '../video/sample-mp4-file.mp4'
import { Video } from 'expo-av';


const HowAppWork = (props)=>{
    
  const { width } = Dimensions.get('window');
    return (
        <View style={styles.container}>
            <ImageBackground source={background} style={styles.image}>
            <Text style={styles.title}>How App Works</Text>
            <Video
	              source={video1}
                shouldPlay = {false}
                resizeMode="cover"
                useNativeControls
                isMuted={false}
                volume={1.0}
	              style={{ width:width, height: 300 }}
	          />
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


export default HowAppWork;