import React, { useState, useEffect, useRef } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import {config} from '../../config';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';

import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import HeaderLog from '../../navigation/header-log';
import Menu from '../../navigation/menu';
import Validate from '../../component/validate'
import {getCycle, getVideo} from '../../api/cycleApi';
import {addStat} from '../../api/statApi'
import {connect} from 'react-redux';
import {loadCycleInfo} from '../../actions/cycle/cycleActions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Rituels = (props)=>{
  const [video, setvideo] = useState('');
  const [cycleId, setCycleId] = useState(121);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isCycleDone,setisCycleDone] =useState(false);
  const [list, setlist] =useState([]);
  const [index,setIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false)
  const [height,setHeight] = useState(hp('100%'))

  let ref = React.createRef();

  useEffect(()=>{
    if(!props.cycle.infos.id){
      getCycle(cycleId).then(
        (res)=>{
          props.loadCycleInfo(res.result[0])
        }
      )}}, [])

  useEffect(()=>{
    if(video){
      setVideoUrl(config.video_url+video.url)
      if (ref.replayAsync){
        ref.setPositionAsync(0)
      }
      
    }}, [video])

    useEffect(()=>{
      if(list){getVideo(list[0]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}}, [list])

    useEffect(()=>{
      if(index>=0 && index<11){
        getVideo(list[index]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}}, [index])

    useEffect(()=>{
      setlist(props.cycle.infos.video)
    }, [props.cycle.infos])

    const nextVideo = ()=>{
      if(index<10){
        setIndex(index+1)
    }}

    const validateCycle = () => {
      let index= props.user.current_subuser
      const data = {
        user_id:props.user.infos.id,
        subuser_id:props.user.subuser[index].id,
        cycle_id:cycleId
      }
      addStat(data).then(
        (res)=>{
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        })
        })
    }

    const handleVideoRef = (component) => {
      ref = component;
    }
    
    const  onSwipeLeft = (gestureState) => {
      ref.getStatusAsync().then(
        (status)=>{
          if(status.positionMillis === status.durationMillis){
            if(index===list.length-1){
              setVideoUrl(null)
              setisCycleDone(true)
            }else{
              nextVideo()
            }
            
          }
        }
      )
    }
    const  onSwipeRight = (gestureState) => {
        setShowMenu(true)
    }
    const restart = () => {
      console.log('restart')
      setIndex(0)
      ref.setPositionAsync(0)
      ref.playAsync()
      setShowMenu(false)
    }

    const randomCycle = () => {
      // TO DO quand d'autres cycles
    }
  
    return (
          <View style={styles.container}>
            
            <View style={styles.maincontent}>
            {showMenu &&<Menu screen='Rituels' randomCycle={randomCycle} restart={restart} setShowMenu={setShowMenu} navigation={props.navigation} style={styles.menu}/>}
            
            <GestureRecognizer
              onSwipeLeft={(state) => onSwipeLeft(state)}
              onSwipeRight={(state) => onSwipeRight(state)}
              config={{velocityThreshold: 0.3,directionalOffsetThreshold: 80}}>
                
             {videoUrl!==null  &&
             <Video
             ref = {handleVideoRef}
             source={{ uri: videoUrl }}
             rate={1.0}
             volume={1.0}
             isMuted={false}
             useNativeControls={true}
             resizeMode="contain"
             shouldPlay={true}
             fullscreen = {false}
             isLooping={false}
             switchToLandscape={()=> {setShowMenu(true)}}
             style={{ width: Dimensions.get('window').width, height: height }}
           />
             }
             </GestureRecognizer>            
          {isCycleDone&&<Validate navigation={props.navigation}/>}
                  
            
            </View>
  
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    maincontent: {
      display:'flex',
      flexDirection:'row'
    },
    menu : {
      position:'absolute',
      left:0,
      bottom:0
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    }
  });

mapDispatchToProps = {
  loadCycleInfo
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        cycle:store.cycle
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rituels);