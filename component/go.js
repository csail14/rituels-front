import React, { useRef,useState, useEffect } from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Audio } from 'expo-av';

  
export default class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            animation : new Animated.Value(0),
            sound : null,
            pressed20:false,
            pressed40:false,
            pressed30:false,
            size:0,
            height:0,
            width:0
             
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
                routes: [{ name: 'Rituels' }],
              })
        });
  
    }

    setDuration=()=> {
      let duration = 0;
      if (this.state.pressed40){
        duration=40
      }
      else if(this.state.pressed20){
        duration=20
      }
      else if(this.state.pressed30){
        duration=30
      }
    this.props.loadCycleInfo({},this.props.allcycle,duration)
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
                   this.setState({
                       pressed20:true,
                       pressed30:false,
                       pressed40:false,
                       size:1,
                       height:200,
                       width:200
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'green', marginRight: 10}, this.state.pressed20?styles.pressed: ""]} ><Text style={styles.minute}>20'</Text></Animated.View>
         </TouchableWithoutFeedback> 
            <TouchableWithoutFeedback onPress={
                ()=>{
                    this.setDuration();
                    this.playSound();
                    this.startAnimation();
                    
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.mainView, transformStyle,{height:this.state.height, width:this.state.width}, {transform: [{ scale: this.state.size }]} ]} ><Text style={styles.title}>Let's go !</Text></Animated.View>
         </TouchableWithoutFeedback>  
         <TouchableWithoutFeedback onPress={
                ()=>{
                    this.setState({
                        pressed30:true,
                        pressed20:false,
                        pressed40:false,
                        size:1,
                        height:200,
                        width:200
                 })
                }
          }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'blue', marginLeft: 10}, this.state.pressed30?styles.pressed: ""]} ><Text style={styles.minute}>30'</Text></Animated.View>
         </TouchableWithoutFeedback>  
        </View>
    );}
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      justifyContent:'center',
      flexDirection:'row'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: "white",
        marginBottom:'auto',
        marginTop:'auto',
        display:'flex'
      },
      minute: {
        fontSize: 15,
        textAlign: 'center',
        color: "white",
        marginBottom:'auto',
        marginTop:'auto',
        display:'flex'
      },
      pressed:{
          borderColor:'white',
          borderWidth:2
      },
      mainView: {
        
        borderRadius:100,
        backgroundColor:'red',
        fontSize: 40,
        zIndex:1,
        textAlign: 'center',
        color: "white",
        display:'flex',
        justifyContent:'center',
        // marginLeft:'auto',
        // marginRight:'auto',
        marginBottom:'auto',
        marginTop:'auto',
      },
      minuteView: {
        height:50,
        width:50,
        borderRadius:100,
        
        textAlign: 'center',
        color: "white",
        display:'flex',
        justifyContent:'center',

        marginBottom:'auto',
        marginTop:'auto',
      },
      animatedBox:{
     width : 190,
     height: 190,
     backgroundColor : ('#2E7D32')
  }
  });
