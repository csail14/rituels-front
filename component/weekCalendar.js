import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LocaleConfig } from "react-native-calendars";
import { getAllEvent } from "../api/eventApi";
import { loadEvent } from "../actions/event/eventActions";
import WeekView from "react-native-week-view";
import AddEvent from "../component/addEvent";
import EditEvent from "../component/editEvent";
import AddRecurentEvent from "../component/addReccurentEvent";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

import moment from "moment";
import "moment/locale/fr";

moment.locale("fr");

const WeekCalendar = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let index = props.user.current_subuser;
    let newData = [];
    if (props.agenda.event.length === 0) {
      getAllEvent(props.user.subuser[index].id).then((res) => {
        if (res.status === 200) {
          props.loadEvent(res.result);
          res.result.map((item) => {
            newData.push({
              id: item.id,
              description: item.title,
              startDate: item.date,
              endDate: "",
              color: props.theme.allTheme.filter(
                (th) => th.id == item.theme_id
              )[0].color,
            });
          });
          setData(newData);
        }
      });
    } else {
      props.agenda.event.map((item) => {
        newData.push({
          id: item.id,
          description: item.title,
          startDate: new Date(item.date),
          endDate: new Date(item.date).setTime(
            new Date(item.date).getTime() + item.duration * 60 * 1000
          ),
          color: props.theme.allTheme.filter((th) => th.id == item.theme_id)[0]
            .color,
        });
      });
      setData(newData);
    }
  }, []);

  useEffect(() => {
    let newData = [];
    props.agenda.event.map((item) => {
      newData.push({
        id: item.id,
        description: item.title,
        startDate: new Date(item.date),
        endDate: new Date(item.date).setTime(
          new Date(item.date).getTime() + item.duration * 60 * 1000
        ),
        color: props.theme.allTheme.filter((th) => th.id == item.theme_id)[0]
          .color,
      });
    });
    setData(newData);
  }, [props.agenda]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.weekView}>
        <WeekView
          height={hp("80%")}
          events={data}
          selectedDate={new Date()}
          locale={"fr"}
          formatDateHeader={"dddd DD MMMM"}
          showTitle={false}
          numberOfDays={7}
          onEventPress={(event) => {
            props.setselectedEvent(
              props.agenda.event.filter((item) => item.id === event.id)
            );
            props.setEditeventPopUp();
          }}
          onGridClick={(pressEvent, startHour, date) => {
            props.setSelectedate(date);
            props.setEventPopUp();
            props.setHour(startHour);
          }}
          hoursInDisplay={12}
          startHour={9}
          leftToRight={true}
          headerStyle={{
            backgroundColor: "#4286f4",
            color: "#fff",
            borderColor: "#fff",
          }}
          hourTextStyle={{ color: "grey", borderColor: "#fff" }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  weekView: {
    width: wp("100%"),
    backgroundColor: "white",
    height: hp("80%"),
  },
  calendar: {
    borderTopWidth: 1,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: hp("100%"),
    width: wp("100%"),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },
});

mapDispatchToProps = {
  loadEvent,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    agenda: store.agenda,
    theme: store.theme,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WeekCalendar);
