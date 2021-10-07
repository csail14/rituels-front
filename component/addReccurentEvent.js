import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TextComponent,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { validateInputField } from "../helpers/form-validator";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import moment, { duration } from "moment";
import "moment/locale/fr";
moment.locale("fr");
import DateTimePicker from "@react-native-community/datetimepicker";
import { loadProgress } from "../actions/progress/progressActions";
import { addEvent, getCount } from "../api/eventApi";
import { getAllEvent } from "../api/eventApi";
import { loadEvent } from "../actions/event/eventActions";
import SelectInput from "react-native-select-input-ios";

import { getNextTriggerDateAsync } from "expo-notifications";

const addEventComp = (props) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notifTime, setnotifTime] = useState(60);
  const [duration, setDuration] = useState(30);
  const [selectedValue, setSelectedValue] = useState(1);
  const [daySelected, setDaySelected] = useState("Lundi");
  const [hourSelected, setHourSelected] = useState("9:00");
  const [hourOptions, sethourOption] = useState([]);

  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  useEffect(() => {
    setOptionsHour();
  }, []);

  let isFamily =
    props.user && props.user.infos && props.user.infos.product === "family";

  const onSubmitForm = (date) => {
    let index = props.user.current_subuser;
    let data = {
      title: title,
      comment: "",
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
      addEvent(data).then((res) => {
        if (res.status === 200) {
          return 200;
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
    props.setPopUpAvailable(false);
  };

  const selectCat = (value) => {
    let filter = options.filter((item) => item.value === value);
    setSelectedValue(filter[0].value);
  };

  const optionsFamily = props.theme.allTheme.map((item) => {
    return { value: item.id, label: item.name };
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
    <View style={isPhone ? styles.containerPhone : styles.container}>
      <TouchableOpacity
        onPress={() => props.setPopUpAvailable(false)}
        style={styles.close}
      >
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        Créer un rituel récurrent sur les 7 prochaines semaines{" "}
      </Text>
      <View style={styles.centerView}>
        <TextInput
          style={styles.input}
          type="text"
          placeholder="Titre"
          onChangeText={(value) => {
            setTitle(value);
          }}
        />

        <Text style={{ color: "black", margin: 10, fontSize: 20 }}>
          Catégorie :{" "}
        </Text>
      </View>

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
          labelStyle={{ color: "grey", fontSize: 20 }}
          cancelKeyText="Annuler"
          submitKeyText="Valider"
          onSubmitEditing={(value) => {
            selectCat(value);
          }}
          options={isFamily ? optionsFamily : optionsKids}
        />
      </View>
      <View style={styles.centerView}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              color: "black",
              margin: 10,
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
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View>
          <Text style={{ color: "black", fontSize: 20, margin: 10 }}>
            Jour :{" "}
          </Text>
          <SelectInput
            value={daySelected}
            style={styles.selectInput}
            labelStyle={{ color: "grey", fontSize: 20 }}
            cancelKeyText="Annuler"
            submitKeyText="Valider"
            onSubmitEditing={(value) => {
              setDaySelected(value);
            }}
            options={optionsDay}
          />
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
            Heure :{" "}
          </Text>
          <SelectInput
            value={hourSelected}
            style={styles.selectInput}
            labelStyle={{ color: "grey", fontSize: 20 }}
            cancelKeyText="Annuler"
            submitKeyText="Valider"
            onSubmitEditing={(value) => {
              setHourSelected(value);
            }}
            options={hourOptions}
          />
        </View>
      </View>
      <View style={styles.centerView}></View>
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
        <TouchableOpacity
          style={styles.button}
          onPress={(e) => {
            e.preventDefault();
            createEventArray();
          }}
        >
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

  title: {
    marginBottom: "20%",
    textAlign: "center",
    fontSize: 30,
    color: "grey",
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
    marginBottom: 10,
    textAlign: "left",
    paddingLeft: 12,
  },
  selectInput: {
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: 150,
    maxWidth: 150,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "grey",
    marginRight: 10,
  },
  datePickerStyle: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
  },
  durationButton: {
    width: 40,
    height: 30,
    borderRadius: 50,
    margin: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: "grey",
    height: 40,
    borderRadius: 8,
    width: "50%",
    margin: 10,
    marginTop: 30,
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
    top: 30,
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

export default connect(mapStateToProps, mapDispatchToProps)(addEventComp);
