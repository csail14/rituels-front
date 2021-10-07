import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/rituals-background.jpg";
import Header from "../../navigation/header-log";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LocaleConfig } from "react-native-calendars";
import { getAllEvent } from "../../api/eventApi";
import { loadEvent } from "../../actions/event/eventActions";
import WeekCalendar from "../../component/weekCalendar";
import moment from "moment";
import AddEventModal from "../../component/addEventModal";
import EditEventModal from "../../component/editEventModal";
import AddRecurentEventModal from "../../component/addRecurrentEventModal.js";
import AddRecurentEvent from "../../component/addReccurentEvent";
import Help from "../../component/popUpHelpWarroom.js";
import { useMediaQuery } from "react-responsive";
//import 'moment/locale/fr';
moment.locale("fr");

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

const Warroom = (props) => {
  const [data, setData] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [recurentEventPopUp, setRecurrentEventPopUp] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [hour, setHour] = useState(0);
  const [selectedDate, setSelectedate] = useState();
  const [selectedEvent, setselectedEvent] = useState([]);

  const toggleAddEventModal = () => {
    setShowAddEventModal(!showAddEventModal);
  };
  const toggleEditEventModal = () => {
    setShowEditEventModal(!showEditEventModal);
  };
  const isPhone = useMediaQuery({
    query: "(max-device-width:450)",
  });

  let isFamily =
    props.user && props.user.infos && props.user.infos.product === "family";

  useEffect(() => {
    let index = props.user.current_subuser;
    let newData = [];
    if (props.agenda.event.length === 0) {
      getAllEvent(props.user.subuser[index].id).then((res) => {
        if (res.status === 200) {
          props.loadEvent(res.result);

          setData(res.result);
        } else {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard."
          );
        }
      });
    } else {
      setData(props.agenda.event);
    }
  }, []);

  useEffect(() => {
    setData(props.agenda.event);
  }, [props.agenda]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Warroom" navigation={props.navigation} />
        <ImageBackground source={background} style={styles.image}>
          <View style={{ height: hp("90%") }}>
            <View>
              <TouchableOpacity
                style={{ marginTop: 30, marginBottom: 10 }}
                onPress={() => {
                  setShowHelp(true);
                }}
              >
                <Text style={styles.text}>
                  Comment fonctionne le quartier général ?
                </Text>
              </TouchableOpacity>

              {!isPhone && (
                <View style={styles.boutonView}>
                  {props.theme.allTheme.map((item) => {
                    return (
                      <View
                        key={item.id}
                        style={[
                          styles.catbutton,
                          {
                            backgroundColor: item.color,
                            opacity: isFamily || item.id === 1 ? 1 : 0.5,
                          },
                        ]}
                      >
                        <Text style={{ marginTop: 10, color: "white" }}>
                          {item.name}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                height: 35,
                backgroundColor: "red",
                padding: 8,
                borderRadius: 12,
                right: 10,
              }}
              onPress={(e) => {
                e.preventDefault();
                setRecurrentEventPopUp(true);
              }}
            >
              <Text style={{ color: "white" }}>Programmer</Text>
            </TouchableOpacity>

            <WeekCalendar
              navigation={props.navigation}
              recurentEventPopUp={recurentEventPopUp}
              setRecurrentEventPopUp={setRecurrentEventPopUp}
              setHour={setHour}
              setSelectedate={setSelectedate}
              setEventPopUp={toggleAddEventModal}
              setEditeventPopUp={toggleEditEventModal}
              setselectedEvent={setselectedEvent}
            />

            <AddEventModal
              setModalVisible={setShowAddEventModal}
              modalVisible={showAddEventModal}
              date={new Date(selectedDate)}
              hour={hour}
            ></AddEventModal>

            <AddRecurentEventModal
              setModalVisible={setRecurrentEventPopUp}
              modalVisible={recurentEventPopUp}
              hour={hour}
              date={new Date(selectedDate)}
            />

            <EditEventModal
              setModalVisible={toggleEditEventModal}
              modalVisible={showEditEventModal}
              event={selectedEvent}
              navigation={props.navigation}
            />

            {showHelp && <Help setShowHelp={setShowHelp} />}
            <TouchableOpacity
              onPress={() =>
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: "Award" }],
                })
              }
              style={styles.button}
            >
              <Text style={styles.textbouton}>Valider</Text>
            </TouchableOpacity>
          </View>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 20,
    marginTop: 10,
  },
  boutonView: {
    marginTop: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
  textbouton: {
    backgroundColor: "#4185F3",
    padding: 10,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    borderColor: "white",
    borderRadius: 100,
  },
  button: {
    borderRadius: 100,
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
export default connect(mapStateToProps, mapDispatchToProps)(Warroom);
