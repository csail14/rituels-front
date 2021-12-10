import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import background from "../../assets/main-background.jpg";
import Header from "../../navigation/header-account";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStateByWeek } from "../../api/awardApi";
import { getstatbyweek } from "../../api/statApi";
import {
  setLevel,
  getAllLevel,
  deleteLevel,
  getCurrentLevel,
  getLevelByOrder,
} from "../../api/levelApi";
import { loadLevel } from "../../actions/level/levelActions";
import moment from "moment";
import { buildI18n } from "../../i18n/index";
import "moment/locale/fr";
moment.locale("fr");

const Account = ({ navigation, user, level, loadLevel, theme, progress }) => {
  const [subuser, setsubuser] = useState({});
  const [stateLevel, setstateLevel] = useState([]);
  const [selectedCat, setSelectedCat] = useState(theme.allTheme[0]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [bestScore, setBestScore] = useState(0);
  const [test, setTest] = useState("0");
  const i18n = buildI18n(user);

  useEffect(() => {
    if (user.subuser) {
      setsubuser(user.subuser[user.current_subuser]);
    }
    let array = [];
    let catLevel = level.allLevel.filter((it) => it.id == selectedCat.id);
    if (catLevel.length > 0) {
      catLevel[0].level.map((level) => {
        let el = {
          ordre: level.ordre,
          name: level.name,
          min: "" + level.min,
          max: "" + level.max,
          id: level.id,
          theme_id: selectedCat.id,
          subuser_id: user.subuser[user.current_subuser].id,
          name_fr: level.name_fr,
          name_en: level.name_en,
          name_es: level.name_es,
        };
        array.push(el);
      });
    }
    setstateLevel(array);
    getstatbyweek(user.subuser[user.current_subuser].id, selectedCat.id).then(
      (res) => {
        setBestScore(Math.max(...Object.values(res.result[0])));
        let currentlevel = getCurrentLevel(
          stateLevel,
          Math.max(...Object.values(res.result[0]))
        );
        setCurrentLevel(currentlevel[0]);
      }
    );
  }, [level, selectedCat]);

  useEffect(() => {
    getstatbyweek(user.subuser[user.current_subuser].id, selectedCat.id).then(
      (res) => {
        setBestScore(Math.max(...Object.values(res.result[0])));
        let currentlevel = getCurrentLevel(
          stateLevel,
          Math.max(...Object.values(res.result[0]))
        );
        setCurrentLevel(currentlevel[0]);
      }
    );
  }, [stateLevel]);

  const addLevel = () => {
    let index = stateLevel.length - 1;
    let min = parseInt(stateLevel[index].max) + 1;
    let max = parseInt(stateLevel[index].max) + 3;
    let el = {
      ordre: stateLevel[index].ordre + 1,
      name: "Nouveau",
      min: "" + min,
      max: "" + max,
      theme_id: selectedCat.id,
      subuser_id: user.subuser[user.current_subuser].id,
    };
    let array = stateLevel;
    array.push(el);
    setstateLevel(array);
    setTest("");
  };

  const lang =
    user &&
    user.subuser &&
    user.subuser[user.current_subuser] &&
    user.subuser[user.current_subuser].lang;

  const saveChange = () => {
    setLevel(
      user.subuser[user.current_subuser].id,
      stateLevel,
      selectedCat.id
    ).then((res) => {
      let all = [];
      for (let i = 0; i < theme.allTheme.length; i++) {
        let item = {};
        getAllLevel(
          user.subuser[user.current_subuser].id,
          theme.allTheme[i].id
        ).then((result) => {
          item.id = theme.allTheme[i].id;
          item.level = result;
          all.push(item);
        });
      }

      loadLevel(all);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  };

  const returnLevelNameCurrentLang = (level) => {
    if (level) {
      switch (lang) {
        case "fr":
          return level.name_fr || level.name;
          break;
        case "en":
          return level.name_en || level.name;
          break;
        case "es":
          return level.name_es || level.name;
          break;

        default:
          break;
      }
    }
    return "";
  };

  const returnCatNameCurrentLang = (cat) => {
    if (cat) {
      switch (lang) {
        case "fr":
          return cat.name_fr || cat.name;
          break;
        case "en":
          return cat.name_en || cat.name;
          break;
        case "es":
          return cat.name_es || cat.name;
          break;

        default:
          break;
      }
    }
    return "";
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Account" navigation={navigation} />
        <ScrollView style={styles.scrollContainer}>
          <ImageBackground source={background} style={styles.image}>
            <Text style={styles.title}>{subuser.name}</Text>
            {currentLevel && (
              <Text style={styles.title}>
                {i18n.t("account.current", "Niveau actuel :")}
                {level ? returnLevelNameCurrentLang() : ""}
                {returnLevelNameCurrentLang(currentLevel)}
              </Text>
            )}
            <View style={styles.boutonView}>
              {theme.allTheme.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.catbutton, { backgroundColor: item.color }]}
                    onPress={() => {
                      setSelectedCat(item);
                    }}
                  >
                    <Text
                      style={[
                        styles.textcatbouton,
                        { marginTop: 10 },
                        selectedCat.id == item.id ? styles.pressed : "",
                      ]}
                    >
                      {returnCatNameCurrentLang(item)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {stateLevel.length > 0 &&
              stateLevel.map((level, index) => {
                return (
                  <View key={index}>
                    {level.ordre < 5 && (
                      <View key={level.id} style={styles.levelBox}>
                        <Text style={[styles.title, { width: "20%" }]}>
                          {returnLevelNameCurrentLang(level)}
                        </Text>
                        <View>
                          <Text style={styles.leveltext}>
                            {" "}
                            {i18n.t("account.min", "Cycle min")}
                          </Text>
                          <TextInput
                            style={styles.input}
                            type="text"
                            value={"" + level.min}
                            onChangeText={(text) => {
                              let i = stateLevel.indexOf(level);
                              let array = stateLevel;
                              array[i].min = text;
                              setstateLevel(array);
                              setTest(text);
                            }}
                          />
                        </View>
                        <View>
                          <Text style={styles.leveltext}>
                            {" "}
                            {i18n.t("account.max", "Cycle max")}
                          </Text>
                          <TextInput
                            style={styles.input}
                            type="text"
                            value={level.max}
                            onChangeText={(text) => {
                              let i = stateLevel.indexOf(level);
                              let array = stateLevel;
                              array[i].max = text;
                              setstateLevel(array);
                              setTest(text);
                            }}
                          />
                        </View>
                      </View>
                    )}
                    {level.ordre >= 5 && (
                      <View key={level.id} style={styles.levelBox}>
                        <TextInput
                          style={styles.title}
                          type="text"
                          value={"" + level.name}
                          onChangeText={(text) => {
                            let i = stateLevel.indexOf(level);
                            let array = stateLevel;
                            array[i].name = text;
                            setstateLevel(array);
                            setTest(text);
                          }}
                        />
                        <View>
                          <Text style={styles.leveltext}>
                            {" "}
                            {i18n.t("account.min", "Cycle min")}
                          </Text>
                          <TextInput
                            style={styles.input}
                            type="text"
                            value={"" + level.min}
                            onChangeText={(text) => {
                              let i = stateLevel.indexOf(level);
                              let array = stateLevel;
                              array[i].min = text;
                              setstateLevel(array);
                              setTest(text);
                            }}
                          />
                        </View>
                        <View>
                          <Text style={styles.leveltext}>
                            {" "}
                            {i18n.t("account.max", "Cycle max")}
                          </Text>
                          <TextInput
                            style={styles.input}
                            type="text"
                            value={level.max}
                            onChangeText={(text) => {
                              let i = stateLevel.indexOf(level);
                              let array = stateLevel;
                              array[i].max = text;
                              setstateLevel(array);
                              setTest(text);
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            let i = stateLevel.indexOf(level);
                            let array = stateLevel;
                            let id = array[i].id;
                            deleteLevel(id, selectedCat.id);
                            array.splice(i, 1);
                            setstateLevel(array);
                            setTest(array.length);
                          }}
                        >
                          <Icon
                            name="trash"
                            size={40}
                            type="evilicon"
                            color="white"
                            style={styles.icon}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <TouchableOpacity onPress={saveChange} style={styles.button}>
                <Text style={styles.text}>
                  {" "}
                  {i18n.t("account.validate", "Valider")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={addLevel}>
                <Text style={styles.text}>
                  {" "}
                  {i18n.t("account.addLevel", "+ Ajouter un Niveau")}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  catbutton: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    //width:'10%',
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
  },
  pressed: {
    color: "white",
  },
  icon: {
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 30,
  },
  boutonView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#321aed",
    paddingLeft: 15,
    paddingRight: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingBottom: 10,
    borderRadius: 8,
  },
  levelBox: {
    borderRadius: 10,
    color: "grey",
    margin: 10,
    padding: 10,
    textAlign: "left",
    backgroundColor: "#D6CBDE",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  leveltext: {
    color: "grey",
    fontSize: 15,
    marginLeft: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    marginBottom: 15,
    marginLeft: 20,
    textAlign: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
  },
});

mapDispatchToProps = {
  loadLevel,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    level: store.level,
    theme: store.theme,
    progress: store.progress,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
