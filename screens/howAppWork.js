import React, { useState, useEffect, useRef, Component } from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import background from "../assets/rituals-background.jpg";
import { FetchUserData } from "../helpers/isFocused";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import Header from "../navigation/header";
import HeaderLog from "../navigation/header-log";
import * as ScreenOrientation from "expo-screen-orientation";

class HowAppWork extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.user.isLogged && (
          <Header screen="HowAppWork" navigation={this.props.navigation} />
        )}
        {this.props.user.isLogged && (
          <HeaderLog screen="HowAppWork" navigation={this.props.navigation} />
        )}
        <ImageBackground source={background} style={styles.image}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              onFullscreenUpdate: Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS,
              source: {
                uri:
                  "https://res.cloudinary.com/dmpzubglr/video/upload/v1612448051/general/Vid%C3%A9o_Pr%C3%A9sentation-720p-210204_ywvr3d.mp4",
              },
            }}
            ref={this.videoRef}
            inFullscreen={false}
            playbackStatus={(status) => {}}
            width={Dimensions.get("window").width}
            height={hp("80%")}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  scrollContainer: {
    width: wp("100%"),
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#321aed",
    width: wp("40%"),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("30%"),
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  commande: {
    flex: 1,
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: wp("10%"),
  },
  checkBox: {
    flex: 1,
  },
  validateContainer: {
    flex: 3,
  },
});

mapDispatchToProps = {};

mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HowAppWork);
