import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, TextComponent, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const PopUpHelp = (props)=>{

    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>props.setShowHelp(false)} style={styles.close}><Text style={styles.closeText}>X</Text></TouchableOpacity>
            <Text  style={styles.title}>Exemple de récompense </Text>
            
        </View>
        
    );
}



const styles = StyleSheet.create({
    
    container: {
      height:hp('60%'),
      width:wp('40%'),
      backgroundColor: '#CAE6FF',
      borderRadius:10,
      borderColor: '#CAE6FF',
      borderWidth:1,
      padding:'8%',
      marginLeft:wp('30%'),
      position:'absolute',
      display:'flex',
      alignItems: "center",
      justifyContent:'space-around'
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
        marginTop:'10%',
        right:'5%'
      },
      closeText:{
          color:'red',
          fontSize:20
      },
    
    }
    );

 

export default  (PopUpHelp);