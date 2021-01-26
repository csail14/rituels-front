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
import Menu from '../../navigation/menu'
import {getCycle, getVideo} from '../../api/cycleApi';
import {connect} from 'react-redux';
import {loadCycleInfo} from '../../actions/cycle/cycleActions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements'

const Rituels = (props)=>{
  const [video, setvideo] = useState('');
  const [cycleId, setCycleId] = useState(111);
  const [videoUrl, setVideoUrl] = useState(null);
  const [type, settype] = useState('normal');
  const [isNextAvailable,setisNextAvailable] =useState(false);
  const [list, setlist] =useState([]);
  const [index,setIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [gestureName, setGestureName] = useState('none')
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
    }}, [video])

    useEffect(()=>{
      if(list){getVideo(list[0]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}}, [list])

    useEffect(()=>{
      if(index>0 && index<11){
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

    const handleVideoRef = (component) => {
      ref = component;
    }
    
    const  onSwipeLeft = (gestureState) => {
      if(isNextAvailable){
        nextVideo()
        ref.setPositionAsync(0)
        setisNextAvailable(false)
        setHeight(hp('100%'))
      }
    }
    const  onSwipeRight = (gestureState) => {
        setShowMenu(true)
    }
  
  
    return (
          <View style={styles.container}>
            
            <View style={styles.maincontent}>
            {showMenu &&<Menu screen='Rituels' setShowMenu={setShowMenu} navigation={props.navigation} style={styles.menu}/>}
            <GestureRecognizer
              onSwipeLeft={(state) => onSwipeLeft(state)}
              onSwipeRight={(state) => onSwipeRight(state)}
              config={{velocityThreshold: 0.3,directionalOffsetThreshold: 80}}>
             {videoUrl !==null &&<VideoPlayer
          videoProps={{
            videoRef: handleVideoRef,                                                                                                 
            shouldPlay: true, 
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
            source: {
              uri: videoUrl,
            },
          }}
          inFullscreen={false}
          switchToLandscape={()=> {setShowMenu(true)}}
          playbackCallback={(status) => {
            if(status.didJustFinish){
              setisNextAvailable(true)
              setHeight(hp('90%'))
              }
            }
          }
          width={Dimensions.get('window').width}
          height={height}
      />  }</GestureRecognizer>            
          </View>
          {isNextAvailable&&<TouchableOpacity 
                        style={styles.button}
                        onPress={
                          () => {
                            setisNextAvailable(false)
                            setHeight(hp('100%'))
                            nextVideo()
                            ref.setPositionAsync(0)
                            ref.playAsync()
                            }
                        }>
                          <Text  style={{color:"white", fontSize:20}}>Video suivante </Text>    
                      </TouchableOpacity>}
            <View>
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
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
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