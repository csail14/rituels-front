import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../assets/main-background.jpg";
import Header from "../navigation/header";
import HeaderLog from "../navigation/header-log";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Menu from "../component/go";
import logo from "../assets/icon.png";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { getAllTheme } from "../api/themeApi";
import { loadTheme } from "../actions/theme/themeActions";
import { config } from "../../config";
import LevelBar from "../component/levelbar";
import { loadCycleInfo } from "../actions/cycle/cycleActions";
import { getCurrentLevel } from "../api/levelApi";
import { getstatbyweek } from "../api/statApi";
import fille1 from "../assets/fille1.png";
import fille2 from "../assets/fille2.png";
import garcon1 from "../assets/garcon1.png";
import garcon2 from "../assets/garcon2.png";
import { isMobile } from "react-device-detect";
import { buildI18n } from "../i18n/index";

const Home = ({
  navigation,
  user,
  progress,
  loadCycleInfo,
  loadTheme,
  cycle,
  level,
  theme,
}) => {
  const [theme_id, setThemeId] = useState(null);
  const [currentLevel, setcurrentLevel] = useState([{ name: "Débutant" }]);
  const [obj, setObj] = useState(0);
  const [state, setState] = useState(0);
  const [image, setImage] = useState(defineImage);
  const [bestScore, setBestScore] = useState(0);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  const i18n = buildI18n(user);

  const defineImage = () => {
    if (user.infos) {
      switch (user.subuser[user.current_subuser].image) {
        case "garcon1":
          setImage(garcon1);
          break;
        case "garcon2":
          setImage(garcon2);
          break;
        case "fille1":
          setImage(fille1);
          break;
        case "fille2":
          setImage(fille2);
          break;
        default:
          break;
      }
    } else return null;
  };

  useEffect(() => {
    defineImage();
    if (theme.allTheme.length == 0) {
      getAllTheme().then((res) => {
        loadTheme(res.result, res.result[0]);
      });
    }
    if (user.isLogged === false) {
      axios.get(config.api_url + "/").then((response) => {
        return response.data;
      });
    }
  }, []);

  useEffect(() => {
    defineImage();
  });

  useEffect(() => {
    if (theme_id) {
      setObj(progress.obj.filter((item) => item.id == theme_id.id)[0].obj);
      setState(
        progress.state.filter((item) => item.id == theme_id.id)[0].state
      );
      getstatbyweek(user.subuser[user.current_subuser].id, theme_id.id).then(
        (res) => {
          setcurrentLevel(
            getCurrentLevel(
              level.allLevel.filter((item) => item.id == theme_id.id)[0].level,
              Math.max(...Object.values(res.result[0]))
            )
          );
        }
      );
    }
  }, [theme_id]);
  return (
    <View style={styles.container}>
      {user && user.isLogged ? (
        <HeaderLog screen="Home" navigation={navigation} />
      ) : (
        <Header screen="Home" navigation={navigation} />
      )}

      <ImageBackground source={background} style={styles.image}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            minHeight: hp("90%"),
          }}
        >
          {user.infos && (
            <>
              <Menu
                loadCycleInfo={loadCycleInfo}
                currentLevel={currentLevel}
                alltheme={theme.allTheme}
                setThemeId={setThemeId}
                allcycle={cycle.allCycle}
                navigation={navigation}
                user={user}
              />
              <View style={styles.levelbar}>
                {theme_id && (
                  <>
                    <LevelBar obj={obj} state={state} />
                    <Text style={styles.text}>
                      {i18n.t("home.rituels", "Rituels")} : {state}/{obj}
                    </Text>
                  </>
                )}
              </View>

              <Text style={styles.subTitle}>
                {i18n.t("home.bonjour", "hi")}
                {user.subuser[user.current_subuser].name}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Warroom" }],
                  })
                }
                style={styles.motivation}
              >
                <Text
                  style={
                    isPhone ? styles.motivationTextPhone : styles.motivationText
                  }
                >
                  {i18n.t("home.organisation", "Organisation")}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {user.isLogged === false && (
            <View style={{ display: "flex", flex: 1 }}>
              <Text style={styles.title}>
                {i18n.t("home.welcome", "Bienvenue sur 4b Premium.")}
              </Text>
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>
                    {" "}
                    {i18n.t("home.account", "Déjà un compte ? ")}
                  </Text>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                      });
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {i18n.t("home.connexion", "Se connecter")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>
                    {" "}
                    {i18n.t("home.new", "Nouveau sur 4b ?")}
                  </Text>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Register" }],
                      });
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {i18n.t("home.newAccount", "Créer un compte")}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={styles.subTitle}>
                    {" "}
                    {i18n.t("home.moreInfo", "Plus d'information sur 4b ")}:
                  </Text>
                  <TouchableOpacity
                    style={styles.link}
                    onPress={() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "HowAppWork" }],
                      });
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {i18n.t("home.clique", "Cliquez-ici ")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {user.isLogged == null && (
            <Text style={styles.title}>
              {i18n.t("home.loading", "Chargement en cours...")}
            </Text>
          )}
          {!isPhone && user.isLogged === true && (
            <TouchableOpacity
              style={styles.logo}
              onPress={async () => {
                await Linking.openURL("http://4bpremium.com/");
              }}
            >
              <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
          )}
          {user.infos && (
            <>
              <TouchableOpacity
                style={styles.picto}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "ChangeAccount" }],
                  });
                }}
              >
                <Image source={image} style={styles.picto} />
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  motivationTextPhone: {
    fontSize: 10,
    paddingTop: 32,
    paddingLeft: 5,
  },
  motivationText: {
    fontSize: 12,
    paddingTop: 32,
    paddingLeft: 5,
  },
  motivation: {
    position: "absolute",
    backgroundColor: "yellow",
    alignItems: "center",
    height: 80,
    width: 80,
    borderRadius: 100,
    left: 10,
    bottom: 10,
  },
  buttonContainer: {
    marginTop: wp("0%"),
  },
  phonelogo: {
    width: 30,
    height: 30,
    position: "absolute",
    left: 2,
    top: 10,
  },

  logo: {
    width: 80,
    height: 80,
    position: "absolute",
    left: 10,
    top: 10,
  },
  levelbar: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    marginLeft: isMobile ? 100 : 0,
    marginRight: isMobile ? 20 : 0,
    marginTop: 10,
    paddingBottom: 40,
    display: "flex",
  },
  subTitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  header: {
    height: 100,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
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
    alignItems: "center",
    justifyContent: "center",
  },
  picto: {
    height: 80,
    width: 80,
    position: "absolute",
    right: 10,
    top: 5,
  },
  link: {
    backgroundColor: "#321aed",
    justifyContent: "center",
    borderRadius: 5,
    padding: 20,
  },
  commande: {
    flex: 1,
  },
  validateContainer: {
    flex: 3,
  },
});

mapDispatchToProps = {
  loadCycleInfo,
  loadTheme,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    progress: store.progress,
    cycle: store.cycle,
    theme: store.theme,
    level: store.level,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
