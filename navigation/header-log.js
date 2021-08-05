import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, Image } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { connect } from "react-redux";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import logo from "../assets/icon.png";

const HeaderLog = (props) => {
  const navigation = props.navigation;
  const [acceuilColor, setAcceuilColor] = useState("#1E90FF");
  const [statColor, setStatColor] = useState("#1E90FF");
  const [logoutColor, setLogoutColor] = useState("#1E90FF");
  const [awardColor, setAwardColor] = useState("#1E90FF");
  const [warroomColor, setWarroomColor] = useState("#1E90FF");
  const [showMenu, setShowMenu] = useState(false);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  useEffect(() => {
    navigationColor();
  }, [props.screen]);

  const navigationColor = () => {
    switch (props.screen) {
      case "Home":
        setAcceuilColor("white");
        break;
      case "Logout":
        setLogoutColor("white");
        break;
      case "Award":
        setAwardColor("white");
        break;
      case "Stat":
        setStatColor("white");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <View style={isPhone ? styles.containerMobile : styles.container}>
        {props.user.subuser && !isPhone && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
                Accueil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Stat" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: statColor }}>
                Statistiques
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Award" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: awardColor }}>
                Récompenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Warroom" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: warroomColor }}>
                Quartier Général
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "ChangeAccount" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: logoutColor }}>
                Mon Compte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "HowAppWork" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: logoutColor }}>
                ?
              </Text>
            </TouchableOpacity>
          </>
        )}
        {isPhone && (
          <>
            <Icon
              name="bars"
              type="font-awesome"
              color="white"
              style={styles.icon}
              size={35}
              onPress={() => setShowMenu(!showMenu)}
            />
            <TouchableOpacity
              style={styles.logo}
              onPress={async () => {
                await Linking.openURL("http://4bpremium.com/");
              }}
            >
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {showMenu && (
        <View>
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
                Accueil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Stat" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: statColor }}>
                Statistiques
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Award" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: awardColor }}>
                Récompenses
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Warroom" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: warroomColor }}>
                Quartier Général
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "ChangeAccount" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: logoutColor }}>
                Mon Compte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "HowAppWork" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: logoutColor }}>
                ?
              </Text>
            </TouchableOpacity>
          </>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerMobile: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",

    flexWrap: "wrap",
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingTop: 15,
  },
  button: {
    paddingTop: 10,
    color: "white",
    height: 50,
  },
  icon: {
    color: "white",
  },

  logo: {
    width: 35,
    height: 35,
  },
});
const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog);
