import React, { useState, useEffect } from "react";
import { View, StyleSheet, Linking, Text, Image } from "react-native";
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

const HeaderAccount = (props) => {
  const navigation = props.navigation;
  const [acceuilColor, setAcceuilColor] = useState("#1E90FF");
  const [changeAccountColor, setChangeAccountColor] = useState("#1E90FF");
  const [accountColor, setaccountColor] = useState("#1E90FF");
  const [mainaccountColor, setmainaccountColor] = useState("#1E90FF");
  const [messageColor, setmessageColor] = useState("#1E90FF");
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
      case "ChangeAccount":
        setChangeAccountColor("white");
        break;
      case "Account":
        setaccountColor("white");
        break;
      case "MainAccount":
        setmainaccountColor("white");
        break;
      case "Message":
        setmessageColor("white");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <View style={isPhone ? styles.containerMobile : styles.container}>
        {isPhone ? (
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
        ) : (
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
                  routes: [{ name: "Account" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
                Mes niveaux
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
              <Text
                style={{ padding: 10, fontSize: 16, color: changeAccountColor }}
              >
                Changer de compte
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "MainAccount" }],
                });
              }}
            >
              <Text
                style={{ padding: 10, fontSize: 16, color: mainaccountColor }}
              >
                Compte parent
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Message" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: messageColor }}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Logout" }],
                });
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {showMenu && (
        <View style={styles.burgerMenuView}>
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
                routes: [{ name: "Account" }],
              });
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
              Mes niveaux
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
            <Text
              style={{ padding: 10, fontSize: 16, color: changeAccountColor }}
            >
              Changer de compte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "MainAccount" }],
              });
            }}
          >
            <Text
              style={{ padding: 10, fontSize: 16, color: mainaccountColor }}
            >
              Compte parent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Message" }],
              });
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: messageColor }}>
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Logout" }],
              });
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  burgerMenuView: {
    alignItems: "center",
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAccount);
