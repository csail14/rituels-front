import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TextComponent,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Video } from "expo-av";

const PopUpHelp = (props) => {
  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: "https://res.cloudinary.com/dmpzubglr/video/upload/v1612448051/general/Vid%C3%A9o_Pr%C3%A9sentation-720p-210204_ywvr3d.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls={true}
        resizeMode="contain"
        shouldPlay={true}
        onTouchStart={true}
        fullscreen={false}
        isLooping={false}
        style={{ width: wp("80%"), height: hp("50%") }}
      />
      <TouchableOpacity>
        <Text onPress={() => props.setShowHelp(false)} style={styles.closeText}>
          Fermer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("60%"),
    width: wp("82%"),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "#CAE6FF",
    borderWidth: 1,
    padding: "8%",
    marginLeft: wp("10%"),
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
  },
  closeText: {
    color: "grey",
    fontSize: 30,
  },
});

export default PopUpHelp;
