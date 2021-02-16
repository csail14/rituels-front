import React, { useState, useEffect } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import {config} from '../../config';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';

import { Video } from 'expo-av';

import Menu from '../../navigation/menu';
import Validate from '../../component/validate'
import {getCycle, getVideo,getAllCycle} from '../../api/cycleApi';
import {addStat} from '../../api/statApi'
import {connect} from 'react-redux';
import {loadCycleInfo} from '../../actions/cycle/cycleActions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {getStateByWeek} from '../../api/awardApi'

const Rituels = (props)=>{
  const [video, setvideo] = useState('');
  const [cycle, setCycle] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isCycleDone,setisCycleDone] =useState(false);
  const [list, setlist] =useState([]);
  const [index,setIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false)
  const [height,setHeight] = useState(hp('100%'))

  let ref = React.createRef();

  useEffect(()=>{
    if(true){
      getAllCycle().then(
        (res)=>{
          props.loadCycleInfo({},res.result,props.cycle.duration)
        }
      )}
    }, [])

  useEffect(()=>{
    console.log('use effect allcycle')
    randomCycle();
  }, [props.cycle.allCycle])

  useEffect(()=>{
    console.log('use effect video')
    if(video){
      console.log('if video')
      if (ref.replayAsync){
        console.log('if replayAsync')
        ref.setPositionAsync(0)
        ref.playAsync()
      }
      setVideoUrl(config.video_url+video.url)
      
    }}, [video])

    useEffect(()=>{
      console.log('use list')
      if(list){
        console.log('if list')
        if (list[0]){
          console.log('if list[0]')
        getVideo(list[0]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}}}, [list])

    useEffect(()=>{
      console.log('use effect index')
      if(index>=0 && index<11){
        getVideo(list[index]).then(
        (res)=>{
          console.log('set video')
          setvideo(res.result[0])
        }
      )}}, [index])

    useEffect(()=>{
      console.log('use effect cycle')
      if(cycle){
        let arrayVideo = JSON.parse(cycle.video)
        setlist(arrayVideo)
      }
    }, [cycle])

    const randomCycle = () => {
      let max = props.cycle.allCycle.length-1
      let random = Math.floor( Math.random() * (max + 1))
      let selectedCycle = props.cycle.allCycle[random]
      setCycle(selectedCycle)
      setShowMenu(false)
      if (ref.replayAsync){
        ref.setPositionAsync(0)
        ref.playAsync()
      }
    }

    const nextVideo = ()=>{
      if(index<10){
        setIndex(index+1)
    }}

    const validateCycle = () => {
      let index= props.user.current_subuser
      const data = {
        user_id:props.user.infos.id,
        subuser_id:props.user.subuser[index].id,
        cycle_id:cycle.id
      }
      addStat(data).then(
        (res)=>{
          getStateByWeek(moment(new Date()).format('W'), props.user.subuser[index].id).then(
            (resultstate)=> {
                props.loadProgress(resultstate.result[0].state,props.progress.obj)
                if(resultstate.result[0].state===props.progress.obj){
                  console.log('stat atteint')
                }
            }
          )
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
              ref.setPositionAsync(0)
              ref.playAsync()
            }
            
          }
        }
      )
    }
    const  onSwipeRight = (gestureState) => {
        setShowMenu(true)
    }

    const restart = () => {
      setIndex(0)
      ref.setPositionAsync(0)
      ref.playAsync()
      setShowMenu(false)
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
             onTouchStart={true}
             fullscreen = {false}
             isLooping={false}
             switchToLandscape={()=> {setShowMenu(true)}}
             style={{ width: Dimensions.get('window').width, height: height }}
           />
             }
             </GestureRecognizer>            
          {isCycleDone&&<Validate validateCycle={validateCycle} navigation={props.navigation}/>}
                  
            
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
        cycle:store.cycle,
        progress: store.progress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rituels);