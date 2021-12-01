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
import SelectInput from "react-native-select-input-ios";
import { modifyEvent, deleteEvent, getCount } from "../api/eventApi";
import { loadCycleInfo } from "../actions/cycle/cycleActions";
import { getAllEvent } from "../api/eventApi";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { buildI18n } from "../i18n/index";

const App = (props) => {
  const [pickedDate, setPickedDate] = useState(
    props.event[0] ? props.event[0].date : null
  );
  const [title, setTitle] = useState(
    props.event[0] ? props.event[0].title : ""
  );
  const [comment, setComment] = useState(
    props.event[0] ? props.event[0].comment : ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [notifTime, setnotifTime] = useState(
    props.event[0] ? props.event[0].notifTime : 0
  );
  const [duration, setDuration] = useState(
    props.event[0] ? props.event[0].duration : 0
  );
  const [selectedValue, setSelectedValue] = useState(
    props.event[0] ? props.event[0].theme_id : 1
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });
  const i18n = buildI18n(props.user);

  useEffect(() => {
    if (props.event[0]) {
      setPickedDate(props.event[0].date);
      setTitle(props.event[0].title);
      setComment(props.event[0].comment);
      setnotifTime(props.event[0].notifTime);
      setDuration(props.event[0].duration);
      setSelectedValue(props.event[0].theme_id);
    }
  }, [props.event[0]]);

  let isFamily =
    props.user && props.user.infos && props.user.infos.product === "family";

  const deleteform = () => {
    let index = props.user.current_subuser;
    deleteEvent(props.event[0].id).then((res) => {
      if (res.status === 200) {
        props.setModalVisible(!props.modalVisible);
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
      } else {
        setErrorMessage(
          "Une erreur est survenue, veuillez réessayer plus tard."
        );
      }
    });
  };

  const launchRituel = () => {
    const cat = props.theme.allTheme.filter(
      (item) => item.id === selectedValue
    )[0];
    props.loadCycleInfo({}, props.cycle.allCycle, duration, cat);
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Rituels" }],
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPickedDate(date);
    hideDatePicker();
  };

  const onSubmitForm = () => {
    let index = props.user.current_subuser;
    let data = {
      title: title,
      comment: comment,
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
      modifyEvent(data, props.event[0].id).then((res) => {
        if (res.status === 200) {
          props.setModalVisible(!props.modalVisible);
          getAllEvent(props.user.subuser[index].id).then((resp) => {
            if (resp.status === 200) {
              props.loadEvent(resp.result);
            }
          });
        } else {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard."
          );
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

  const selectCat = (value) => {
    const options = isFamily ? optionsFamily : optionsKids;
    let filter = options.filter((item) => item.value === value);
    setSelectedValue(filter[0].value);
  };

  const optionsFamily = props.theme.allTheme.map((item) => {
    return { value: item.id, label: item.name };
  });
  const optionsKids = optionsFamily.filter((item) => item.value === 1);

  return (
    <View style={isPhone ? styles.centeredViewMobile : styles.centeredView}>
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
            <Text style={styles.title}>Modifier un rituel</Text>
            <View style={styles.centerView}>
              <TextInput
                style={styles.input}
                type="text"
                value={title}
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
                  doneText={"Valider"}
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
                  marginBottom: 10,
                }}
              >
                Prévu le :{" "}
              </Text>
              <Text style={styles.dateStyle} onPress={showDatePicker}>
                {pickedDate === null
                  ? "Selectionner une date"
                  : moment(new Date(pickedDate)).format("LLL")}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                format="dddd  DD MMMM  HH:mm"
                locale="fr-FR"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
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
                  Durée :{" "}
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
              <TextInput
                style={styles.comment}
                type="text"
                placeholder="Commentaire"
                onChangeText={(text) => {
                  setComment(text);
                }}
              />
              <View style={styles.centerView}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: "blue", marginBottom: 10 },
                  ]}
                  onPress={(e) => {
                    e.preventDefault();
                    launchRituel();
                  }}
                >
                  <Text style={styles.buttonText}>Lancer le rituel</Text>
                </TouchableOpacity>
              </View>
              {props.user.infos.notification == 1 && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={styles.text}>M'alerter </Text>
                  <TextInput
                    style={styles.inputTime}
                    value={"" + notifTime}
                    onChangeText={(text) => {
                      setnotifTime(text);
                    }}
                  />
                  <Text style={styles.text}>min avant </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={(e) => {
                  e.preventDefault();
                  onSubmitForm();
                }}
              >
                <Text style={styles.textStyle}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Pressable
              style={styles.button}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginLeft: wp("30%"),
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
  loadCycleInfo,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    agenda: store.agenda,
    progress: store.progress,
    theme: store.theme,
    cycle: store.cycle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
