import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Button,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { loadProgress } from "../actions/progress/progressActions";
import { loadEvent } from "../actions/event/eventActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { validateInputField } from "../helpers/form-validator";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import RNPickerSelect from "react-native-picker-select";

import SelectInput from "react-native-select-input-ios";
import { addEvent, getCount } from "../api/eventApi";
import { getAllEvent } from "../api/eventApi";
import { buildI18n } from "../i18n/index";
const App = (props) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notifTime, setnotifTime] = useState(60);
  const [duration, setDuration] = useState(30);
  const [selectedValue, setSelectedValue] = useState(1);
  const [daySelected, setDaySelected] = useState("Lundi");
  const [hourSelected, setHourSelected] = useState("9:00");
  const [hourOptions, sethourOption] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const i18n = buildI18n(props.user);
  const isPhone = useMediaQuery({
    query: "(min-device-width:450)",
  });

  useEffect(() => {
    setOptionsHour();
  }, []);

  let isFamily =
    props.user && props.user.infos && props.user.infos.product === "family";

  const onSubmitForm = (pickedDate) => {
    let index = props.user.current_subuser;
    let data = {
      title: title,
      comment: "",
      date: pickedDate,
      theme_id: selectedValue,
      user_id: props.user.infos.id,
      subuser_id: props.user.subuser[index].id,
      notifTime: notifTime,
      duration: duration,
    };
    setErrorMessage("");
    let error = formValidator();
    if (error === "") {
      addEvent(data).then((res) => {
        if (res.status === 200) {
          return 200;
        } else {
          setErrorMessage(i18n.t("error.reessayer"));
        }
      });
    }
  };

  const formValidator = () => {
    let error = false;
    error = validateInputField("title", "string", title, i18n.t);
    if (error !== "") {
      setErrorMessage("Veuillez ajouter un titre");
      return error;
    }
    return "";
  };

  const createEventArray = () => {
    let dateArray = [];
    const date = new Date().getDay();
    let value = 0;
    switch (daySelected) {
      case "Lundi":
        value = 1;
        break;
      case "Mardi":
        value = 2;
        break;
      case "Mercredi":
        value = 3;
        break;
      case "Jeudi":
        value = 4;
        break;
      case "Vendredi":
        value = 5;
        break;
      case "Samedi":
        value = 6;
        break;
      case "Dimanche":
        value = 0;
        break;
      default:
        break;
    }
    let time = hourSelected.split(":");
    let ecart = value - date;
    let newDate = new Date().setDate(new Date().getDate() + ecart);
    newDate = new Date(newDate).setHours(time[0], time[1]);
    newDate = new Date(newDate);
    dateArray.push(newDate);
    for (let i = 0; i < 7; i++) {
      newDate = new Date(newDate).setDate(newDate.getDate() + 7);
      newDate = new Date(newDate).setHours(time[0], time[1]);
      newDate = new Date(newDate);
      dateArray.push(newDate);
    }
    for (let i = 0; i < dateArray.length; i++) {
      onSubmitForm(dateArray[i]);
    }
    let index = props.user.current_subuser;
    getAllEvent(props.user.subuser[index].id).then((resp) => {
      if (resp.status === 200) {
        props.loadEvent(resp.result);
      }
    });
    getCount(
      props.user.subuser[index].id,
      moment(new Date()).format("W"),
      props.theme.allTheme
    ).then((resultobj) => {
      props.loadProgress(props.progress.state, resultobj);
    });
    props.setModalVisible(!props.modalVisible);
  };

  const selectCat = (value) => {
    const options = isFamily ? optionsFamily : optionsKids;
    let filter = options.filter((item) => item.value === value);
    setSelectedValue(filter[0].value);
  };

  const lang =
    props.user &&
    props.user.subuser &&
    props.user.subuser[props.user.current_subuser] &&
    props.user.subuser[props.user.current_subuser].lang;

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

  const optionsFamily = props.theme.allTheme.map((item) => {
    return { value: item.id, label: returnCatNameCurrentLang(item) };
  });
  const optionsKids = optionsFamily.filter((item) => item.value === 1);

  const optionsDay = [
    {
      value: "Lundi",
      label: "Lundi",
    },
    {
      value: "Mardi",
      label: "Mardi",
    },
    {
      value: "Mercredi",
      label: "Mercredi",
    },
    {
      value: "Jeudi",
      label: "Jeudi",
    },
    {
      value: "Vendredi",
      label: "Vendredi",
    },
    {
      value: "Samedi",
      label: "Samedi",
    },
    {
      value: "Dimanche",
      label: "Dimanche",
    },
  ];

  const setOptionsHour = () => {
    let optionsHour = [];
    for (let i = 0; i < 28; i++) {
      if (i % 2 == 0) {
        let item = { value: `${8 + i / 2}:00`, label: `${8 + i / 2}:00` };
        optionsHour.push(item);
      } else {
        let item = {
          value: `${8 + (i - 1) / 2}:30`,
          label: `${8 + (i - 1) / 2}:30`,
        };
        optionsHour.push(item);
      }
    }
    sethourOption(optionsHour);
  };
  return (
    <View style={isPhone ? styles.centeredViewMobile : styles.centerView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{i18n.t("component.recurrent")} </Text>
            <View style={styles.centerView}>
              <TextInput
                style={styles.input}
                type="text"
                placeholder={i18n.t("component.Titre")}
                onChangeText={(value) => {
                  setTitle(value);
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Catégorie :{" "}
              </Text>
              <View>
                <RNPickerSelect
                  style={styles.selectInput}
                  onValueChange={(value) => selectCat(value)}
                  items={isFamily ? optionsFamily : optionsKids}
                  doneText={i18n.t("application.Valider")}
                >
                  <Text
                    style={[
                      styles.selectInput,
                      { color: "grey", fontSize: 19 },
                    ]}
                  >
                    {isFamily
                      ? optionsFamily &&
                        optionsFamily.length &&
                        optionsFamily.filter(
                          (item) => item.value === selectedValue
                        )[0] &&
                        optionsFamily.filter(
                          (item) => item.value === selectedValue
                        )[0].label
                      : optionsKids &&
                        optionsKids.length &&
                        optionsKids.filter(
                          (item) => item.value === selectedValue
                        )[0] &&
                        optionsKids.filter(
                          (item) => item.value === selectedValue
                        )[0].label}
                    ↓
                  </Text>
                </RNPickerSelect>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View>
                <Text style={{ color: "black", fontSize: 20, margin: 10 }}>
                  Jour :{" "}
                </Text>
                <RNPickerSelect
                  style={styles.selectInput}
                  onValueChange={(value) => setDaySelected(value)}
                  items={optionsDay}
                  doneText={i18n.t("application.Valider")}
                >
                  <Text
                    style={[
                      styles.selectInput,
                      { color: "grey", fontSize: 19 },
                    ]}
                  >
                    {daySelected} ↓
                  </Text>
                </RNPickerSelect>
              </View>
              <View>
                <Text
                  style={{
                    color: "black",
                    marginLeft: 10,
                    margin: 10,
                    fontSize: 20,
                  }}
                >
                  {i18n.t("component.Heure")}
                </Text>
                <RNPickerSelect
                  style={styles.selectInput}
                  onValueChange={(value) => setHourSelected(value)}
                  items={hourOptions}
                  doneText={i18n.t("application.Valider")}
                >
                  <Text
                    style={[
                      styles.selectInput,
                      { color: "grey", fontSize: 19 },
                    ]}
                  >
                    {hourSelected} ↓
                  </Text>
                </RNPickerSelect>
              </View>
            </View>

            <View style={styles.centerView}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: "black",
                    marginBottom: 10,
                    fontSize: 20,
                  }}
                >
                  {i18n.t("component.Durée :")}
                </Text>
                <Text
                  style={[
                    styles.durationButton,
                    {
                      color: duration == 20 ? "blue" : "grey",
                      fontWeight: duration == 20 ? "700" : "400",
                    },
                  ]}
                  onPress={() => {
                    setDuration(20);
                  }}
                >
                  20
                </Text>
                <Text
                  style={[
                    styles.durationButton,
                    {
                      color: duration == 30 ? "blue" : "grey",
                      fontWeight: duration == 30 ? "700" : "400",
                    },
                  ]}
                  onPress={() => {
                    setDuration(30);
                  }}
                >
                  30
                </Text>
                <Text
                  style={[
                    styles.durationButton,
                    {
                      color: duration == 40 ? "blue" : "grey",
                      fontWeight: duration == 40 ? "700" : "400",
                    },
                  ]}
                  onPress={() => {
                    setDuration(40);
                  }}
                >
                  40
                </Text>
              </View>
            </View>
            <View style={styles.centerView}>
              {props.user.infos.notification == 1 && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={styles.text}>
                    {" "}
                    {i18n.t("component.M'alerter")}{" "}
                  </Text>
                  <TextInput
                    style={styles.inputTime}
                    value={"" + notifTime}
                    onChangeText={(text) => {
                      setnotifTime(text);
                    }}
                  />
                  <Text style={styles.text}>
                    {" "}
                    {i18n.t("component.min avant")}{" "}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={(e) => {
                  e.preventDefault();
                  createEventArray();
                }}
              >
                <Text style={styles.textStyle}>{i18n.t("register.save")}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.button}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>{i18n.t("component.fermer")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginLeft: wp("10%"),
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewMobile: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "grey",
  },
  centerView: {
    alignItems: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 10,
    fontSize: 15,
  },
  dateStyle: {
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    color: "grey",
    fontSize: 18,
  },
  selectInput: {
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
  },
  inputTime: {
    backgroundColor: "white",
    width: 50,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 12,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    minWidth: "40%",
    marginBottom: 10,
    textAlign: "left",
    paddingLeft: 12,
    alignItems: "center",
  },
  comment: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 100,
    textAlign: "left",
    minWidth: "40%",
    marginBottom: 10,
    paddingLeft: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#CAE6FF",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  datePickerStyle: {
    width: "80%",
    marginBottom: 10,
  },
  durationButton: {
    width: 40,
    height: 30,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: "grey",
    height: 40,
    borderRadius: 8,
    width: "50%",
    marginBottom: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
  },
  close: {
    position: "absolute",
    height: "10%",
    width: "10%",
    marginTop: "10%",
    right: "5%",
    height: 20,
  },
  closeText: {
    color: "red",
    fontSize: 20,
  },
  errorMessage: {
    fontSize: 20,
    position: "absolute",
    textAlign: "center",
    marginTop: "10%",
    color: "red",
  },
});

mapDispatchToProps = {
  loadEvent,
  loadProgress,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    agenda: store.agenda,
    progress: store.progress,
    theme: store.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
