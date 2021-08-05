import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
  TextComponent,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { validateInputField } from "../helpers/form-validator";
import moment, { duration } from "moment";
import "moment/locale/fr";
moment.locale("fr");
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import DateTimePicker from "@react-native-community/datetimepicker";
import { loadProgress } from "../actions/progress/progressActions";
import { modifyEvent, deleteEvent, getCount } from "../api/eventApi";
import { getAllEvent } from "../api/eventApi";
import { loadEvent } from "../actions/event/eventActions";
import { loadCycleInfo } from "../actions/cycle/cycleActions";
import SelectInput from "react-native-select-input-ios";

const editEventComp = (props) => {
  const [date, setDate] = useState(props.event[0].date);
  const [title, setTitle] = useState(props.event[0].title);
  const [comment, setComment] = useState(props.event[0].comment);
  const [errorMessage, setErrorMessage] = useState("");
  const [notifTime, setnotifTime] = useState(props.event[0].notifTime);
  const [duration, setDuration] = useState(props.event[0].duration);
  const [selectedValue, setSelectedValue] = useState(props.event[0].theme_id);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  useEffect(() => {}, []);

  const deleteform = () => {
    let index = props.user.current_subuser;
    deleteEvent(props.event[0].id).then((res) => {
      if (res.status === 200) {
        props.setPopUpAvailable(false);
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

  const onSubmitForm = () => {
    let index = props.user.current_subuser;
    let data = {
      title: title,
      comment: comment,
      date: date,
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
          props.setPopUpAvailable(false);
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
    error = validateInputField("title", "string", title);
    if (error !== "") {
      setErrorMessage("Veuillez ajouter un titre");
      return error;
    }
    return "";
  };

  const selectCat = (value) => {
    let filter = options.filter((item) => item.value === value);
    setSelectedValue(filter[0].value);
  };

  const options = props.theme.allTheme.map((item) => {
    return { value: item.id, label: item.name };
  });

  return (
    <View style={isPhone ? styles.containerPhone : styles.container}>
      <TouchableOpacity
        onPress={() => props.setPopUpAvailable(false)}
        style={styles.close}
      >
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

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
      <View style={styles.centerView}>
        <Text style={{ color: "black", marginTop: 20, fontSize: 20 }}>
          Catégorie :{" "}
        </Text>
      </View>
      <SelectInput
        value={selectedValue}
        style={styles.selectInput}
        labelStyle={{ color: "grey", fontSize: 20 }}
        cancelKeyText="Annuler"
        submitKeyText="Valider"
        onSubmitEditing={(value) => {
          selectCat(value);
        }}
        options={options}
      />

      {Platform.OS == "ios" && (
        <View style={styles.centerView}>
          <DateTimePicker
            style={styles.datePickerStyle}
            value={date}
            mode="datetime"
            format="dddd  DD MMMM  HH:mm"
            minuteInterval="15"
            confirmBtnText="Valider"
            locale="fr-FR"
            cancelBtnText="Annuler"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                paddingRight: 5,
                top: 4,
              },
              dateInput: {
                marginLeft: "30%",

                borderRadius: 10,
              },
              marginLeft: 100,
            }}
            onDateChange={(event, date) => {
              setDate(date);
            }}
          />
        </View>
      )}
      {showDatePicker && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={new Date(date)}
          mode="date"
          format="dddd  DD MMMM"
          confirmBtnText="Valider"
          locale="fr-FR"
          onChange={async (event, date) => {
            await setShowDatePicker(false);
            setDate(date);
          }}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={new Date(date)}
          mode="time"
          format="HH:mm"
          confirmBtnText="Valider"
          locale="fr-FR"
          onChange={async (event, date) => {
            await setShowTimePicker(false);
            setDate(date);
          }}
        />
      )}
      {Platform.OS == "android" && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 12,
              margin: 3,
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{moment(new Date(date)).format("LL")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 12,
              margin: 3,
            }}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{moment(new Date(date)).format("LT")}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.centerView}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              color: "black",
              marginTop: 10,
              marginBottom: 30,
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
      {comment !== "" && (
        <TextInput
          style={styles.comment}
          type="text"
          value={comment}
          onChangeText={(text) => {
            setComment(text);
          }}
        />
      )}
      <View style={styles.centerView}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "blue", marginTop: 10, marginBottom: 0 },
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
      <View style={styles.centerView}>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
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
            style={styles.buttonDelete}
            onPress={(e) => {
              e.preventDefault();
              deleteform();
            }}
          >
            <Text style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("80%"),
    width: wp("40%"),
    minWidth: 350,
    backgroundColor: "#CAE6FF",
    borderRadius: 10,
    borderColor: "#CAE6FF",
    borderWidth: 1,
    padding: "8%",
    marginLeft: wp("30%"),
    position: "absolute",
    display: "flex",

    justifyContent: "space-around",
  },
  centerView: {
    alignItems: "center",
  },
  durationButton: {
    width: 40,
    height: 30,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 30,
    fontSize: 20,
  },
  containerPhone: {
    height: hp("80%"),
    width: wp("100%"),
    backgroundColor: "#CAE6FF",
    borderRadius: 10,
    borderColor: "#CAE6FF",
    borderWidth: 1,
    padding: "8%",
    position: "absolute",
    display: "flex",

    justifyContent: "space-around",
  },
  inputTime: {
    backgroundColor: "white",
    width: 50,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 12,
    marginTop: 40,
  },
  text: {
    color: "black",
    textAlign: "center",
    marginTop: 50,
    marginLeft: 15,
    fontSize: 15,
  },
  selectInput: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 35,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
  },
  title: {
    marginBottom: "20%",
    textAlign: "center",
    fontSize: 30,
    color: "grey",
  },
  comment: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 100,
    textAlign: "left",
    width: "90%",
    marginTop: 20,
    paddingLeft: 12,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    height: 40,
    width: "70%",
    marginBottom: 15,
    textAlign: "left",
    paddingLeft: 12,
  },
  datePickerStyle: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "grey",
    height: 40,
    borderRadius: 8,
    width: "50%",
    marginTop: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 2,
    marginRight: 2,
  },
  buttonDelete: {
    backgroundColor: "red",
    height: 40,
    borderRadius: 8,
    width: "50%",
    marginTop: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
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

export default connect(mapStateToProps, mapDispatchToProps)(editEventComp);
