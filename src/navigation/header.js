import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useMediaQuery } from "react-responsive";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import logo from "../assets/icon.png";
import { buildI18n } from "../i18n/index";

const Header = (props) => {
  const navigation = props.navigation;
  const [acceuilColor, setAcceuilColor] = useState("#1E90FF");
  const [detailColor, setDetailColor] = useState("#1E90FF");
  const [loginColor, setLoginColor] = useState("#1E90FF");
  const [registerColor, setRegisterColor] = useState("#1E90FF");
  const [showMenu, setShowMenu] = useState(false);

  const i18n = buildI18n(props.user);

  useEffect(() => {
    navigationColor();
  }, [props.screen]);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  const navigationColor = () => {
    switch (props.screen) {
      case "Home":
        setAcceuilColor("white");
        break;
      case "HowAppWork":
        setDetailColor("white");
        break;
      case "Login":
        setLoginColor("white");
        break;
      case "Register":
        setRegisterColor("white");
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
                if (props.screen !== "Home") {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                }
              }}
              color={acceuilColor}
            >
              <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
                {i18n.t("header.home", "Accueil")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Détails"
              style={styles.button}
              color={detailColor}
              onPress={() => {
                if (props.screen !== "HowAppWork") {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "HowAppWork" }],
                  });
                }
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: detailColor }}>
                {i18n.t("header.details", "Détails")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="S'inscrire"
              style={styles.button}
              color={registerColor}
              onPress={() => {
                if (props.screen !== "Register") {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Register" }],
                  });
                }
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: registerColor }}>
                {i18n.t("header.register", "S'inscrire")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Se connecter"
              style={styles.button}
              color={loginColor}
              onPress={() => {
                if (props.screen !== "Login") {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  });
                }
              }}
            >
              <Text style={{ padding: 10, fontSize: 16, color: loginColor }}>
                {i18n.t("header.login", "Se connecter")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {showMenu && (
        <View style={{ zIndex: 1 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (props.screen !== "Home") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                });
              }
            }}
            color={acceuilColor}
          >
            <Text style={{ padding: 10, fontSize: 16, color: acceuilColor }}>
              {i18n.t("header.home", "Accueil")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Détails"
            style={styles.button}
            color={detailColor}
            onPress={() => {
              if (props.screen !== "HowAppWork") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "HowAppWork" }],
                });
              }
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: detailColor }}>
              {i18n.t("header.details", "Détails")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="S'inscrire"
            style={styles.button}
            color={registerColor}
            onPress={() => {
              if (props.screen !== "Register") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Register" }],
                });
              }
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: registerColor }}>
              {i18n.t("header.register", "S'inscrire")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            title="Se connecter"
            style={styles.button}
            color={loginColor}
            onPress={() => {
              if (props.screen !== "Login") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }
            }}
          >
            <Text style={{ padding: 10, fontSize: 16, color: loginColor }}>
              {i18n.t("header.login", "Se connecter")}
            </Text>
          </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    minHeight: 50,
  },
  button: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
