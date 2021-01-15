import React, { useState, useEffect, useRef } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../assets/rituals-background.jpg';
import video1 from '../video/sample-mp4-file.mp4'
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { NavigationContainer,useIsFocused  } from '@react-navigation/native';
import Header from '../navigation/header'

const HowAppWork = (props)=>{
    
  const isFocused = useIsFocused();
  const video=null;
 
  console.log('isfocudsed',isFocused); 

  useEffect(
    () => {
     if(!isFocused){
       pauseVideo();
     }
    }
    ,
    [isFocused],
  );
  
  const pauseVideo = () => {
    console.log('dans pause')
    console.log(video)
    if(videoref) {
      console.log('pause')
      //videoref.pauseAsync();
    }
  }
  const videoref = React.forwardRef 
    return (

        <View style={styles.container}>
          <Header screen='HowAppWork' navigation={props.navigation}/>
            <ImageBackground source={background} style={styles.image}>     

            <VideoPlayer
            //ref={videoref}
            videoProps={{
              

              shouldPlay:true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
              source: {
                uri: 'https://res.cloudinary.com/dmpzubglr/video/upload/v1610633687/general/Vid%C3%A9o_Pr%C3%A9sentation-720p-201114_eialb0.mp4',
              },
            }}
            inFullscreen={false}
            width={Dimensions.get('window').width}
            height={hp('80%')}
            

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