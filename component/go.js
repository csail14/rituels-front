import React, { useRef,useState, useEffect } from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Audio } from 'expo-av';
import {  Circle, Text as SvgText, TextPath, TSpan, G, Svg }
  from 'react-native-svg';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  
export default class Menu extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            animation : new Animated.Value(0),
            sound : null,
            pressedCat1:false,
            pressedCat2:false,
            pressedCat3:false,
            pressedCat4:false,
            pressedCat5:false,
            pressedCat6:false,
            pressedCat7:false,
            pressedCat8:false,
            pressedCat9:false,
            pressed20:false,
            pressed40:false,
            pressed30:false,
            timeSelected:false,
            catSelected:false
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
      <>
        <View style={styles.container} >
            <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                      timeSelected:true,
                       pressed20:false,
                       pressed30:true,
                       pressed40:false,
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#5C3ACC', position:'absolute', top:hp('30%'), left:wp('56%') }, this.state.pressed30?styles.pressed: ""]} ><Text style={styles.details}>30'</Text></Animated.View>
         </TouchableWithoutFeedback> 
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                      catSelected:true,
                      pressedCat1:false,
                      pressedCat2:false,
                      pressedCat3:false,
                      pressedCat4:false,
                      pressedCat5:false,
                      pressedCat6:false,
                      pressedCat7:false,
                      pressedCat8:false,
                      pressedCat9:true
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#CC3E3A', position:'absolute', top:hp('21%'), left:wp('45%') }, this.state.pressedCat9?styles.pressed: ""]} ><Text style={styles.details}>9</Text></Animated.View>
         </TouchableWithoutFeedback> 
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                      timeSelected:true,
                       pressed20:true,
                       pressed30:false,
                       pressed40:false,
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#A878F0', position:'absolute', top:hp('24%'), left:wp('52%') }, this.state.pressed20?styles.pressed: ""]} ><Text style={styles.details}>20'</Text></Animated.View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:true,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#EA6363', position:'absolute', top:hp('23%'), left:wp('38%') }, this.state.pressedCat8?styles.pressed: ""]} ><Text style={styles.details}>8</Text></Animated.View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:true,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#F6A2A2', position:'absolute', top:hp('30%'), left:wp('33%') }, this.state.pressedCat7?styles.pressed: ""]} ><Text style={styles.details}>7</Text></Animated.View>
         </TouchableWithoutFeedback>  
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:true,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#DCD97A', position:'absolute', top:hp('39%'), left:wp('31%') }, this.state.pressedCat6?styles.pressed: ""]} ><Text style={styles.details}>6</Text></Animated.View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:true,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#3BA5D8', position:'absolute', top:hp('56%'), left:wp('45%') }, this.state.pressedCat3?styles.pressed: ""]} ><Text style={styles.details}>3</Text></Animated.View>
         </TouchableWithoutFeedback>  
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:true,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#9FD83B', position:'absolute', top:hp('47%'), left:wp('33%') }, this.state.pressedCat5?styles.pressed: ""]} ><Text style={styles.details}>5</Text></Animated.View>
         </TouchableWithoutFeedback>  
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:true,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#3BD83F', position:'absolute', top:hp('54%'), left:wp('38%') }, this.state.pressedCat4?styles.pressed: ""]} ><Text style={styles.details}>4</Text></Animated.View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:false,
                    pressedCat2:true,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#3B67D8', position:'absolute', top:hp('54%'), left:wp('51%') }, this.state.pressedCat2?styles.pressed: ""]} ><Text style={styles.details}>2</Text></Animated.View>
         </TouchableWithoutFeedback>     
         <TouchableWithoutFeedback onPress={
                ()=>{
                   this.setState({
                    catSelected:true,
                    pressedCat1:true,
                    pressedCat2:false,
                    pressedCat3:false,
                    pressedCat4:false,
                    pressedCat5:false,
                    pressedCat6:false,
                    pressedCat7:false,
                    pressedCat8:false,
                    pressedCat9:false
                       
                })
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#0D0AAE', position:'absolute', top:hp('47%'), left:wp('56%') }, this.state.pressedCat1?styles.pressed: ""]} ><Text style={styles.details}>1</Text></Animated.View>
         </TouchableWithoutFeedback>   
            <TouchableWithoutFeedback onPress={
                ()=>{if(this.state.timeSelected){
                  this.setDuration();
                  this.playSound();
                  this.startAnimation();
                }
                }
                    }>
           <Animated.View useNativeDriver={true} style={[styles.mainView, transformStyle]} ><Text style={styles.title}>Let's go !</Text></Animated.View>
         </TouchableWithoutFeedback>  
         <TouchableWithoutFeedback onPress={
                ()=>{
                    this.setState({
                        timeSelected:true,
                        pressed30:false,
                        pressed20:false,
                        pressed40:true
                 })
                }
          }>
           <Animated.View useNativeDriver={true} style={[styles.minuteView, transformStyle, {backgroundColor:'#6C069B', marginLeft: 10}, this.state.pressed40?styles.pressed: ""]} ><Text style={styles.minute}>40'</Text></Animated.View>
         </TouchableWithoutFeedback>  
         
        </View>
        
      </>
        
    );}
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      justifyContent:'center',
      flexDirection:'row',
      position:'relative'
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
      details: {
        fontSize: 15,
        textAlign: 'center',
        color: "white",
        
        
        display:'flex'
      },
      pressed:{
          borderColor:'white',
          borderWidth:2,
          width:150,
          height:150
      },
      mainView: {
        height:200,
        width:200,
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
