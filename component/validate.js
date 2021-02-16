import React, { useRef,useState, useEffect } from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Audio } from 'expo-av';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  
export default class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            animation : new Animated.Value(0),
            sound : null
             
          }
    }

    getSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/magic-wand.wav'))
        return sound
    }

     playSound = async ()=> {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/magic-wand.wav')
         );
        this.setState({sound:sound})
        await this.state.sound.playAsync(); 
    }

    startAnimation=()=>{
        Animated.timing(this.state.animation,{
          toValue : 1000,
          duration : 2000,
          useNativeDriver: true
        }).start(()=>{
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
        });
  
    }
 render(){  
    const transformStyle ={
        transform : [{ 
            translateX : this.state.animation,
        }]
      }
    return (
        <View style={styles.container} >
            
            <TouchableWithoutFeedback onPress={
                ()=>{
                    this.playSound();
                    this.props.validateCycle();
                    this.startAnimation();
                }
            }>
           <Animated.View useNativeDriver={true} style={[styles.mainView, transformStyle]} ><Text style={styles.title}>Valider le rituel</Text></Animated.View>
         </TouchableWithoutFeedback>  
        </View>
    );}
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      justifyContent:'center'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: "white",
        marginBottom:'auto',
        marginTop:'auto',
        display:'flex'
      },
      mainView: {
        height:hp('40%'),
        width:wp('30%'),
        borderRadius:100,
        backgroundColor:'#321aed',
        fontSize: 40,
        textAlign: 'center',
        color: "white",
        display:'flex',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto'
      },
      animatedBox:{
     width : 190,
     height: 190,
     backgroundColor : ('#2E7D32')
  }
  });
