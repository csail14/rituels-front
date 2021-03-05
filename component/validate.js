import React, { useRef,useState, useEffect } from 'react';
import {Animated, StyleSheet, Text, View, TouchableOpacity,TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Audio } from 'expo-av';
import {connect} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

  import {addStat} from '../api/statApi'
  import {getStateByWeek} from '../api/awardApi'
  import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import {loadProgress} from '../actions/progress/progressActions'
import { Video } from 'expo-av';
  
 class Menu extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            animation : new Animated.Value(0),
            sound : null,
            showVideo:false
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


     validateCycle = () => {
      let i= this.props.user.current_subuser
      const data = {
        user_id:this.props.user.infos.id,
        subuser_id:this.props.user.subuser[i].id,
        cycle_id:this.props.cycle_id
      }
      console.log('data', data)
      addStat(data).then(
        (res)=>{
          getStateByWeek(moment(new Date()).format('W'), this.props.user.subuser[i].id).then(
            (resultstate)=> {
                this.props.loadProgress(resultstate.result[0].state,this.props.progress.obj)
                if(resultstate.result[0].state===this.props.progress.obj){
                  this.setState({showVideo:true})
                }
                else{
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                }
            }
          )
        })
    }

    startAnimation=()=>{
        Animated.timing(this.state.animation,{
          toValue : 1000,
          duration : 2000,
          useNativeDriver: true
        }).start(()=>{

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
            
            <TouchableOpacity onPress={
                async ()=>{
                    this.validateCycle()

                    this.playSound();
                    //this.startAnimation();
                }
            }>
           <Animated.View useNativeDriver={true} style={[styles.mainView, transformStyle]} ><Text style={styles.title}>Valider le rituel</Text></Animated.View>
         </TouchableOpacity>
         <TouchableOpacity onPress={
                async ()=>{
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  })
                }
            }>
           <Animated.View useNativeDriver={true} style={[styles.mainView,{backgroundColor:'red'}, transformStyle]} ><Text style={styles.title}>Rituel non validé</Text></Animated.View>
         </TouchableOpacity>
         {this.state.showVideo && <Video
             source={{ uri: 'https://res.cloudinary.com/dmpzubglr/video/upload/v1614688789/general/validation%20award/Validation_semaine-720p-210227_bmhovt.mp4' }}
             rate={1.0}
             volume={1.0}
             isMuted={false}
             useNativeControls={true}
             resizeMode="contain"
             shouldPlay={true}
             onTouchStart={true}
             fullscreen = {false}
             onPlaybackStatusUpdate={
               (status)=>{
                 if(status.didJustFinish==true){
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Award' }],
                  })
                 }
               }
             }
             isLooping={false}
             switchToLandscape={()=> {}}
             style={{position:'absolute', top:0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
           />}
    
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
        backgroundColor:'green',
        fontSize: 40,
        textAlign: 'center',
        color: "white",
        display:'flex',
        justifyContent:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30
      },
      animatedBox:{
     width : 190,
     height: 190,
     backgroundColor : ('#2E7D32')
  }
  });
  mapDispatchToProps = {
    loadProgress
    }
    
    mapStateToProps = (store)=>{
      return {
        user: store.user,
        cycle: store.cycle,
        progress: store.progress
      }
    }
    export default  connect(mapStateToProps, mapDispatchToProps)(Menu);