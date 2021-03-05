import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, TextComponent, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Video } from 'expo-av';

const PopUpHelp = (props)=>{

    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>props.setShowHelp(false)} style={styles.close}><Text style={styles.closeText}>X</Text></TouchableOpacity>
            <Video
          
             source={{ uri: 'https://res.cloudinary.com/dmpzubglr/video/upload/v1612448051/general/Vid%C3%A9o_Pr%C3%A9sentation-720p-210204_ywvr3d.mp4' }}
             rate={1.0}
             volume={1.0}
             isMuted={false}
             useNativeControls={true}
             resizeMode="contain"
             shouldPlay={true}
             onTouchStart={true}
             fullscreen = {false}
             isLooping={false}
             
             style={{ width: wp('80%'), height: hp('50%') }}
           />
            
        </View>
        
    );
}



const styles = StyleSheet.create({
    
    container: {
      height:hp('60%'),
      width:wp('82%'),
      backgroundColor: 'black',
      borderRadius:10,
      borderColor: '#CAE6FF',
      borderWidth:1,
      padding:'8%',
      marginLeft:wp('10%'),
      position:'absolute',
      display:'flex',
      alignItems: "center",
      justifyContent:'space-around',
      zIndex:1
    },
    title:{
        
        marginBottom:'20%',
        textAlign:'center',
        fontSize:30,
        color:'grey'
    },
  
      button: {
        backgroundColor: "grey",
        height: 40,
        borderRadius:8,
        width:'50%',
        marginTop:50,
        textAlign:'center',
        alignItems: "center",
        justifyContent: "center",

      },
      buttonText: {
          color: "white"
      },
      close: {
        position:'absolute',
        height:'10%',
        width:'10%',
        marginTop:'6%',
        right:'0%'
      },
      closeText:{
          color:'red',
          fontSize:30
      },
    
    }
    );

 

export default  (PopUpHelp);