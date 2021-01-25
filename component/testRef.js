import React from "react";
import {ImageBackground, Dimensions , StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


class VideoDemo extends React.Component {
  
  getVideo = elem => {
    this.video = elem
  }

  playVideo = () => {
    // You can use the play method as normal on your video ref
    this.video.play()
  };

  pauseVideo = () => {
    // Pause as well
    this.video.pause();
  };

  render = () => {
    return (
      <View>
        <VideoPlayer
          ref={this.getVideo}
          videoProps={{
            shouldPlay:true,
            //positionMillis:0,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            onFullscreenUpdate:Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
            source: {
              uri: "http://techslides.com/demos/sample-videos/small.mp4",
            },
          }}
          width={Dimensions.get('window').width}
          height={hp('80%')}
        />

        <TouchableOpacity
        onPress={this.pauseVideo}>
        <Text> Pause!</Text>
        </TouchableOpacity>
          
      </View>
    );
  };
}

export default VideoDemo;