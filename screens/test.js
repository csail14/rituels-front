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
import { NavigationContainer,useIsFocused  } from '@react-navigation/native';
import HeaderLog from '../../navigation/header-log';
import {getCycle, getVideo} from '../../api/cycleApi';
import {connect} from 'react-redux';
import {loadCycleInfo} from '../../actions/cycle/cycleActions';
import VideoComponent from '../../component/video'
import Test from '../../component/testRef'

const Rituels = (props)=>{
  const [video, setvideo] = useState('');
  const [cycleId, setCycleId] = useState(111);
  const [videoUrl, setVideoUrl] = useState(null);
  const [type, settype] = useState('normal');
  const [time, setTime] = useState(0);
  const [isNextAvailable,setisNextAvailable] =useState(false);
  const [list, setlist] =useState([]);
  const [index,setIndex] = useState(0);

  let ref = React.createRef();

  useEffect(()=>{
    if(!props.cycle.infos.id){
      getCycle(cycleId).then(
        (res)=>{
          props.loadCycleInfo(res.result[0])
        }
      )
    }
    }, [])

  useEffect(()=>{
    if(video){
      console.log('set url', index, config.video_url+video.url)
      setVideoUrl(config.video_url+video.url)
      
    }
    if(ref!== null){
      console.log('plein ecran')
      //ref.presentFullscreenPlayer()
    }
  }, [video])

    useEffect(()=>{

      if(list){getVideo(list[0]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}
    }, [list])

    useEffect(()=>{
      console.log('useEFfect index')
      if(index>0 && index<11){
        console.log('get VIdeo', index)
        getVideo(list[index]).then(
        (res)=>{
          setvideo(res.result[0])
        }
      )}
    }, [index])

    useEffect(()=>{
      setlist(props.cycle.infos.video)
    }, [props.cycle.infos])

    const nextVideo = ()=>{
      if(index<10){
        setIndex(index+1)
        console.log('setIndex')
    }
    }

    const handleVideoRef = (component) => {
      ref = component;
    }
    
  
    return (
          <View style={styles.container}>
          <HeaderLog screen='Rituels' navigation={props.navigation}/>
            <ImageBackground source={background} style={styles.image}>
             {videoUrl !==null &&<VideoPlayer
          videoProps={{
            videoRef: handleVideoRef,     /* THIS IS CORRECT*/                                                                                                           
            shouldPlay: true, 
            //positionMillis:{time},
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
            source: {
              uri: videoUrl,
            },
          }}

         
          inFullscreen={true}
          playbackCallback={(status) => {

            if(status.didJustFinish){
                  nextVideo()
                  ref.setPositionAsync(0)
                  ref.playAsync()
              }
            }
          }
          width={Dimensions.get('window').width}
          height={hp('80%')}
      />}
          <TouchableOpacity 
                        style={styles.link}
                        onPress={
                          () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                              });}
                        }>
                          <Text  style={{color:"white", fontSize:20}}>Video suivante </Text>    
                      </TouchableOpacity>
            <View>
            </View>
            </ImageBackground>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
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
    input: {
        backgroundColor: 'white',
        width: wp('60%'),
      height: 40,
      marginBottom: 15,
      marginLeft: wp('20%'),
      paddingLeft: wp('5%')
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
    },
    commande: {
        flex:1
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp('10%'),
    }, 
    checkBox: {
        flex: 1,
    },
    validateContainer: {
        flex: 3
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