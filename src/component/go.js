import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Audio } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      sound: null,
      pressedCat1: false,
      pressedCat2: false,
      pressedCat3: false,
      pressedCat4: false,
      pressedCat5: false,
      pressedCat6: false,
      pressedCat7: false,
      pressedCat8: false,
      pressedCat9: false,
      pressed20: false,
      pressed40: false,
      pressed30: false,
      timeSelected: false,
      catSelected: false,
    };
  }

  getSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/magic-wand.wav")
    );
    return sound;
  };

  playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/magic-wand.wav")
    );
    this.setState({ sound: sound });
    await this.state.sound.playAsync();
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1000,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Rituels" }],
      });
    });
  };

  setTheme = (theme) => {
    this.props.setThemeId(this.props.alltheme[theme]);
  };

  setParams = () => {
    let duration = 0;
    let cat = 0;
    if (this.state.pressed40) {
      duration = 40;
    } else if (this.state.pressed20) {
      duration = 20;
    } else if (this.state.pressed30) {
      duration = 30;
    }
    if (this.state.pressedCat1) {
      cat = this.props.alltheme[0];
    } else if (this.state.pressedCat2) {
      cat = this.props.alltheme[1];
    } else if (this.state.pressedCat3) {
      cat = this.props.alltheme[2];
    } else if (this.state.pressedCat4) {
      cat = this.props.alltheme[3];
    } else if (this.state.pressedCat5) {
      cat = this.props.alltheme[4];
    } else if (this.state.pressedCat6) {
      cat = this.props.alltheme[5];
    } else if (this.state.pressedCat7) {
      cat = this.props.alltheme[6];
    } else if (this.state.pressedCat8) {
      cat = this.props.alltheme[7];
    } else if (this.state.pressedCat9) {
      cat = this.props.alltheme[8];
    }

    this.props.loadCycleInfo({}, this.props.allcycle, duration, cat);
  };
  render() {
    const transformStyle = {
      transform: [
        {
          translateX: this.state.animation,
        },
      ],
    };
    let isFamily =
      this.props.user &&
      this.props.user.infos &&
      this.props.user.infos.product === "family";

    return (
      <>
        <View style={styles.container}>
          <View style={styles.circle}>
            <TouchableWithoutFeedback
              onPress={() => {
                if (this.state.timeSelected && this.state.catSelected) {
                  this.setParams();
                  this.playSound();
                  this.startAnimation();
                }
              }}
            >
              <Animated.View
                useNativeDriver={true}
                style={[styles.mainView, transformStyle]}
              >
                <Text style={styles.title}>Let's go !</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  timeSelected: true,
                  pressed30: false,
                  pressed20: false,
                  pressed40: true,
                });
              }}
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#6C069B",
                    position: "absolute",
                    top: 100,

                    right: -30,
                  },
                  this.state.pressed40
                    ? { borderColor: "white", borderWidth: 2 }
                    : "",
                ]}
              >
                <Text style={styles.minute}>40'</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setTheme(0);
                this.setState({
                  catSelected: true,
                  pressedCat1: true,
                  pressedCat2: false,
                  pressedCat3: false,
                  pressedCat4: false,
                  pressedCat5: false,
                  pressedCat6: false,
                  pressedCat7: false,
                  pressedCat8: false,
                  pressedCat9: false,
                });
              }}
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#0D0AAE",
                    position: "absolute",
                    bottom: 33,
                    right: -15,
                  },
                  this.state.pressedCat1
                    ? [
                        styles.pressed,
                        { position: "absolute", bottom: -45, right: -120 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat1 ? (
                  <View>
                    <Text style={styles.details}>Ecole</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="edit"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(2);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: true,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#3BA5D8",
                    position: "absolute",
                    bottom: -30,
                    left: 100,
                    opacity: isFamily ? 1 : 0.33,
                  },
                  this.state.pressedCat3
                    ? [
                        styles.pressed,
                        { position: "absolute", bottom: -145, left: 50 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat3 ? (
                  <View>
                    <Text style={styles.details}>Lecture</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="book"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(5);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: true,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#DCD97A",
                    position: "absolute",
                    left: -30,
                    top: 100,
                    opacity: isFamily ? 1 : 0.33,
                  },
                  this.state.pressedCat6
                    ? [
                        styles.pressed,
                        { position: "absolute", top: 50, left: -145 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat6 ? (
                  <View>
                    <Text style={styles.details}>Domicile Extérieur</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="leaf"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(8);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: true,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#CC3E3A",
                    position: "absolute",
                    top: -30,
                    left: 100,
                    opacity: isFamily ? 1 : 0.33,
                    alignItems: "center",
                  },
                  this.state.pressedCat9
                    ? [
                        styles.pressed,
                        { position: "absolute", top: -145, left: 50 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat9 ? (
                  <View>
                    <Text style={styles.details}>Sport Extérieur</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="futbol-o"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(7);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: true,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#EA6363",
                    position: "absolute",
                    top: -15,
                    opacity: isFamily ? 1 : 0.33,
                    left: 33,
                    alignItems: "center",
                  },
                  this.state.pressedCat8
                    ? [
                        styles.pressed,
                        { position: "absolute", top: -125, left: -45 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat8 ? (
                  <View>
                    <Text style={styles.details}>Sport Interieur </Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="universal-access"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(6);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: true,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#F6A2A2",
                    position: "absolute",
                    top: 33,
                    opacity: isFamily ? 1 : 0.33,
                    left: -15,
                  },
                  this.state.pressedCat7
                    ? [
                        styles.pressed,
                        { position: "absolute", top: -45, left: -120 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat7 ? (
                  <View>
                    <Text style={styles.details}>Hygiène de vie</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="cutlery"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  timeSelected: true,
                  pressed20: true,
                  pressed30: false,
                  pressed40: false,
                });
              }}
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#A878F0",
                    position: "absolute",
                    top: -15,
                    right: 33,
                  },
                  this.state.pressed20
                    ? { borderColor: "white", borderWidth: 2 }
                    : "",
                ]}
              >
                <Text style={styles.details}>20'</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({
                  timeSelected: true,
                  pressed20: false,
                  pressed30: true,
                  pressed40: false,
                });
              }}
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#5C3ACC",
                    position: "absolute",
                    top: 33,
                    right: -15,
                  },
                  this.state.pressed30
                    ? { borderColor: "white", borderWidth: 2 }
                    : "",
                ]}
              >
                <Text style={styles.details}>30'</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(1);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: true,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#3B67D8",
                    position: "absolute",
                    bottom: -15,
                    right: 33,
                    opacity: isFamily ? 1 : 0.33,
                    alignItems: "center",
                  },
                  this.state.pressedCat2
                    ? [
                        styles.pressed,
                        { position: "absolute", bottom: -125, right: -45 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat2 ? (
                  <View>
                    <Text style={styles.details}>Etudes</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="university"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(3);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: true,
                        pressedCat5: false,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#3BD83F",
                    position: "absolute",
                    bottom: -15,
                    left: 33,
                    opacity: isFamily ? 1 : 0.33,
                  },
                  this.state.pressedCat4
                    ? [
                        styles.pressed,
                        { position: "absolute", bottom: -125, left: -45 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat4 ? (
                  <View>
                    <Text style={styles.details}>Arts, Musique</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="music"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={
                isFamily
                  ? () => {
                      this.setTheme(4);
                      this.setState({
                        catSelected: true,
                        pressedCat1: false,
                        pressedCat2: false,
                        pressedCat3: false,
                        pressedCat4: false,
                        pressedCat5: true,
                        pressedCat6: false,
                        pressedCat7: false,
                        pressedCat8: false,
                        pressedCat9: false,
                      });
                    }
                  : null
              }
            >
              <Animated.View
                useNativeDriver={true}
                style={[
                  styles.minuteView,
                  transformStyle,
                  {
                    backgroundColor: "#9FD83B",
                    position: "absolute",
                    bottom: 33,
                    left: -15,
                    opacity: isFamily ? 1 : 0.33,
                  },
                  this.state.pressedCat5
                    ? [
                        styles.pressed,
                        { position: "absolute", bottom: -45, left: -120 },
                      ]
                    : "",
                ]}
              >
                {this.state.pressedCat5 ? (
                  <View>
                    <Text style={styles.details}>Domicile Intérieur</Text>
                    <Text style={styles.details}>
                      {" "}
                      Niveau : {this.props.currentLevel[0].name}
                    </Text>
                  </View>
                ) : (
                  <Icon
                    name="home"
                    type="font-awesome"
                    color="white"
                    style={styles.icon}
                  />
                )}
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 250,

    flex: 1,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
  circle: {
    height: 250,
    width: 250,

    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    marginBottom: "auto",
    marginTop: "auto",
    display: "flex",
  },
  minute: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    marginBottom: "auto",
    marginTop: "auto",
    display: "flex",
  },
  details: {
    fontSize: 15,
    textAlign: "center",
    color: "white",

    display: "flex",
  },
  pressed: {
    borderColor: "white",
    borderWidth: 2,
    width: 150,
    height: 150,
  },
  etude: {
    height: 30,
    width: 30,
  },
  mainView: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "red",
    fontSize: 40,
    zIndex: 1,
    textAlign: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",
    // marginLeft:'auto',
    // marginRight:'auto',
    marginBottom: "auto",
    marginTop: "auto",
  },
  minuteView: {
    height: 50,
    width: 50,
    borderRadius: 100,

    textAlign: "center",
    color: "white",
    display: "flex",
    justifyContent: "center",

    marginBottom: "auto",
    marginTop: "auto",
  },
  animatedBox: {
    width: 190,
    height: 190,
    backgroundColor: "#2E7D32",
  },
});
