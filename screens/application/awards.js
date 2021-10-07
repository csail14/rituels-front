import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CalendarPicker from "react-native-calendar-picker";
import background from "../../assets/rituals-background.jpg";
import Header from "../../navigation/header-log";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import {
  saveNewAward,
  getAwardByWeek,
  getStateByWeek,
} from "../../api/awardApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateInputField } from "../../helpers/form-validator";
import { getAllTheme } from "../../api/themeApi";
import { loadTheme } from "../../actions/theme/themeActions";
import LevelBar from "../../component/levelbar";
import SelectInput from "react-native-select-input-ios";
import { useMediaQuery } from "react-responsive";

const Awards = ({ navigation, user, progress, theme, loadTheme }) => {
  const [date, setdate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState(0);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [award, setAward] = useState(null);
  const [nextaward, setnextAward] = useState(null);
  const [obj, setObj] = useState(0);
  const [state, setState] = useState(0);
  const [alltheme, setallTheme] = useState(theme.allTheme);

  const [selectedCat, setSelectedCat] = useState({
    id: 1,
    name: "categorie 1",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showCalendar, setshowCalendar] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  let isFamily = user && user.infos && user.infos.product === "family";

  useEffect(() => {
    if (alltheme.length == 0) {
      getAllTheme().then((res) => {
        setallTheme(res.result);
        setSelectedCat(res.result[0]);
        loadTheme(res.result, res.result[0]);
      });
    } else {
      setSelectedCat(theme.allTheme[0]);
    }

    if (progress.obj.length) {
      setObj(progress.obj.filter((item) => item.id == selectedCat.id)[0].obj);
    }
    if (progress.state.length) {
      setState(
        progress.state.filter((item) => item.id == selectedCat.id)[0].state
      );
    }
  }, []);

  useEffect(() => {
    let index = user.current_subuser;
    getAwardByWeek(
      moment(new Date()).format("W"),
      user.subuser[index].id,
      selectedCat.id
    ).then((res) => {
      setAward(res[0]);
    });
    let nextweek = parseInt(moment(new Date()).format("W")) + 1;
    getAwardByWeek(nextweek, user.subuser[index].id, selectedCat.id).then(
      (res) => {
        setnextAward(res[0]);
      }
    );
    if (progress.obj.length) {
      setObj(progress.obj.filter((item) => item.id == selectedCat.id)[0].obj);
    }
    if (progress.state.length) {
      setState(
        progress.state.filter((item) => item.id == selectedCat.id)[0].state
      );
    }

    let nextMonday = new Date();

    nextMonday.setDate(nextMonday.getDate() - nextMonday.getDay() + 8);
    setdate(nextMonday);
  }, [selectedCat]);

  const options = [
    {
      value: 0,
      label: "Choisis ou saisis ta récompense   ▼ ",
    },
    {
      value: 1,
      label: "Faire un gâteau",
    },
    {
      value: 2,
      label: "Une promenade en forêt",
    },
    {
      value: 3,
      label: "Lecture d'une BD",
    },
    {
      value: 4,
      label: "Visionner 3 épisodes d'une série",
    },
    {
      value: 6,
      label: "Aller au cinéma",
    },
    {
      value: 7,
      label: "Aller au musée",
    },
    {
      value: 8,
      label: "Faire une partie d'un jeu de société",
    },
    {
      value: 9,
      label: "Regarder un match de sport",
    },
    {
      value: 5,
      label: "Autre ...",
    },
  ];
  const setOptionsCatArray = () => {
    let array = [];
    alltheme.forEach((item) => {
      let index = { value: item.id, label: item.name };
      array.push(index);
    });
    return array;
  };
  const optionsCategoryFamily = setOptionsCatArray();
  const optionsCategoryKids = optionsCategoryFamily.filter(
    (item) => item.value === 1
  );

  const setCatFromSelect = (value) => {
    let themeSelected = [];
    alltheme.forEach((item) => {
      if (item.id === value) {
        themeSelected.push(item);
      }
    });
    if (themeSelected.length) {
      setSelectedCat(themeSelected[0]);
    }
  };

  const onSubmitForm = () => {
    let index = user.current_subuser;
    let form = {
      user_id: user.infos.id,
      subuser_id: user.subuser[index].id,
      week: date,
      title: title,
      message: message,
      done: false,
      theme_id: selectedCat.id,
      resetPrevious: false,
    };

    setErrorMessage("");
    let error = formValidator();
    if (error === "") {
      saveNewAward(form).then((res) => {
        if (res.status === 500) {
          Alert.alert(
            "Attention",
            "Un award a déjà été programmé pour cette semaine. Voulez-vous le remplacer ?",
            [
              {
                text: "Non",
                onPress: () => {
                  ClearForm();
                },
                style: "cancel",
              },
              {
                text: "Oui",
                onPress: () => {
                  form.resetPrevious = true;
                  saveNewAward(form);
                  ClearForm();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                },
              },
            ],
            { cancelable: false }
          );
        } else if (res.status === 200) {
          ClearForm();
          navigation.reset({
            index: 0,
            routes: [{ name: "Account" }],
          });
        } else if (!res.status === 200) {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard."
          );
        }
      });
    }
  };

  const ClearForm = () => {
    setTitle("");
    setMessage("");
  };

  const formValidator = () => {
    let error = false;
    error = validateInputField("title", "string", title);
    if (error !== "") {
      setErrorMessage("Veuillez ajouter un titre à votre récompense");
      return error;
    }
    return "";
  };

  const selectAward = (value) => {
    let filter = options.filter((item) => item.value === value);
    setSelectedValue(filter[0].value);
    if (filter[0].value !== 5 && filter[0].value !== 0) {
      setTitle(filter[0].label);
    } else if (filter[0].value === 5) {
      setTitle("");
      setShowTitleInput(true);
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Awards" navigation={navigation} />

        <ImageBackground source={background} style={styles.image}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              minHeight: hp("100%"),
            }}
          >
            <View>
              {!isPhone && (
                <View style={styles.boutonView}>
                  {alltheme.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[
                          styles.catbutton,
                          { backgroundColor: item.color },
                        ]}
                        onPress={() => {
                          isFamily || item.id === 1
                            ? setSelectedCat(item)
                            : null;
                        }}
                      >
                        <Text
                          style={[
                            styles.textbouton,
                            {
                              marginTop: 10,
                              opacity: isFamily || item.id === 1 ? 1 : 0.33,
                            },
                            selectedCat.id == item.id ? styles.pressed : "",
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <Text style={styles.title}>
                Quelle récompense pour la semaine prochaine ???
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <SelectInput
                  value={selectedValue}
                  style={styles.selectInput}
                  labelStyle={{
                    color: "white",
                    fontSize: 20,
                  }}
                  cancelKeyText="Annuler"
                  submitKeyText="Valider"
                  onSubmitEditing={(value) => {
                    selectAward(value);
                  }}
                  options={options}
                />
              </View>
              <View style={styles.formView}>
                {showTitleInput && (
                  <TextInput
                    style={styles.input}
                    type="text"
                    placeholder={"Award"}
                    value={title}
                    pickerViewStyle={{ backgroundColor: "white" }}
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                  />
                )}

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setshowCalendar(true)}
                >
                  <Text style={styles.textDate}>
                    Semaine du {moment(date).format("dddd DD MMMM")}
                  </Text>
                </TouchableOpacity>
                {isPhone ? (
                  <>
                    <Text style={styles.text}>Catégorie :</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <SelectInput
                        value={selectedCat.id}
                        style={styles.selectInput}
                        labelStyle={{
                          color: "white",
                          fontSize: 20,
                        }}
                        cancelKeyText="Annuler"
                        submitKeyText="Valider"
                        onSubmitEditing={(value) => {
                          setCatFromSelect(value);
                        }}
                        options={
                          isFamily ? optionsCategoryFamily : optionsCategoryKids
                        }
                      />
                    </View>
                  </>
                ) : (
                  <Text style={styles.text}>
                    Catégorie : {selectedCat.name}
                  </Text>
                )}
                <Text style={styles.errorMessage}>{errorMessage}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={(e) => {
                    e.preventDefault();
                    onSubmitForm();
                  }}
                >
                  <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={(e) => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Account" }],
                    });
                  }}
                >
                  <Text style={styles.buttonText}>
                    Passer à l'étape suivante
                  </Text>
                </TouchableOpacity>
              </View>
              {showCalendar && (
                <View style={styles.calendar}>
                  <CalendarPicker
                    height={hp("55%")}
                    previousTitle={"Préc"}
                    disabledDates={(d) => {
                      if (new Date(d).getDay() !== 1) {
                        return d;
                      }
                    }}
                    disabledDatesTextStyle={{ color: "grey" }}
                    nextTitle={"Suiv"}
                    selectedDayColor={"blue"}
                    startFromMonday={true}
                    locale={"FR"}
                    width={wp("50%")}
                    onDateChange={(date) => {
                      setdate(date);
                      setshowCalendar(false);
                    }}
                  />
                </View>
              )}
              {nextaward && (
                <View>
                  <Text style={styles.title}>
                    Ta récompense de la semaine prochaine:{" "}
                  </Text>
                  <Text style={styles.text}>{nextaward.title}</Text>
                </View>
              )}
              {award && (
                <>
                  <Text style={styles.title}>
                    Ta récompense de la semaine :{" "}
                  </Text>
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.text}>{award.title}</Text>

                    <LevelBar
                      theme_id={selectedCat.id}
                      style={styles.levelBar}
                      obj={obj}
                      state={state}
                    />
                    <Text style={styles.text}>
                      Rituels réalisés : {state}/{obj}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContainer: {
    // width: wp('100%'),
    // height:hp('100%'),
    textAlign: "center",
  },
  formView: {
    alignItems: "center",
    marginTop: 20,
  },
  selectInput: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 500,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
  },
  calendar: {
    position: "absolute",
    marginLeft: wp("25%"),
    marginTop: hp("20%"),
    backgroundColor: "#bdbdde",
    zIndex: 1,
    borderRadius: 10,
    width: wp("50%"),
  },
  datePickerStyle: {
    width: "80%",
    marginBottom: 20,
  },
  pressed: {
    color: "white",
  },
  levelBar: {
    justifyContent: "center",
  },
  textDate: {
    paddingTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    paddingLeft: wp("5%"),
  },
  buttonText: {
    color: "white",
    borderColor: "white",
    borderRadius: 100,
  },
  button: {
    backgroundColor: "grey",
    height: 40,
    borderRadius: 8,
    width: "50%",

    marginBottom: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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
  errorMessage: {
    color: "red",
    fontSize: 20,
  },
});

mapDispatchToProps = {
  loadTheme,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    progress: store.progress,
    theme: store.theme,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Awards);
