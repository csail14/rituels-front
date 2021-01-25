import React, { useState, useEffect, useRef,useImperativeHandle } from 'react';
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import {config} from '../config';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';



function VideoComponent(props, ref) {
    const [videoUrl, setvideoUrl] = useState(props.videoUrl)
    const videoRef = null;

    useEffect(()=>{
        console.log("lancement component video")
        }, [])

    useEffect(()=>{
        console.log('useeffect props')
        setvideoUrl(props.videoUrl)
      }, [props])
    
      const pause = ()=> {

      }
  
    return(
        <VideoPlayer
          videoProps={{
            shouldPlay:true,
            //positionMillis:0,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
            source: {
              uri: videoUrl,
            },
          }}

          ref={ref}
          inFullscreen={false}
          playbackCallback={(status) => {
            //console.log(status)
            //setTime(status.positionMillis)
            if(status.didJustFinish){

                console.log('next video')
                console.log(ref)
                //setisNextAvailable(true);
              }
            }
          }
          width={Dimensions.get('window').width}
          height={hp('80%')}
      />)
  }

  export default React.forwardRef(VideoComponent)