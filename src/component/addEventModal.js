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
import { addEvent, getCount } from "../api/eventApi";
import { getAllEvent } from "../api/eventApi";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const App = (props) => {
  const [pickedDate, setPickedDate] = useState(props.date);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notifTime, setnotifTime] = useState(60);
  const [duration, setDuration] = useState(30);
  const [selectedValue, setSelectedValue] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  useEffect(() => {
    var d = props.date;
    d.setDate(d.getDate() - new Date().getDay() + 1);
    d.setHours(props.hour);
    setPickedDate(d);
  });

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
  let isFamily =
    props.user && props.user.infos && props.user.infos.product === "family";

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
      addEvent(data).then((res) => {
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
    }
  };

  const formValidator = () => {
    let error = false;
    error = validateInputField("title", "string", title);
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
    <View style={isPhone ? styles.centeredViewMobile : styles.centerView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={isPhone ? styles.centeredViewMobile : styles.centerView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Nouveau rituel</Text>
            <View style={styles.centerView}>
              <TextInput
                style={styles.input}
                type="text"
                placeholder="Titre"
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
                minuteInterval="15"
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
    //marginLeft: wp("30%"),
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewMobile: {
    // marginLeft: wp("30%"),
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 22,
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
    // margin: 20,
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
    textAlign: "center",
    marginBottom: 10,
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
