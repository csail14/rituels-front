import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { loadUserInfo } from "../../actions/user/userActions";
import { loadProgress } from "../../actions/progress/progressActions";
import background from "../../assets/rituals-background.jpg";
import Header from "../../navigation/header-account";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateInputField } from "../../helpers/form-validator";
import DatePicker from "react-native-datepicker";
import { saveSubUser, getAllSubuser } from "../../api/userApi";
import fille1 from "../../assets/fille1.png";
import fille2 from "../../assets/fille2.png";
import garcon1 from "../../assets/garcon1.png";
import garcon2 from "../../assets/garcon2.png";
import RNPickerSelect from "react-native-picker-select";
import { buildI18n } from "../../i18n/index";

const optionsLang = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Espagnol" },
];
const AddSubuser = ({ navigation, loadUserInfo, user }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [birth_date, setBirth_date] = useState(new Date());
  const [fille1Color, setFille1Color] = useState("white");
  const [fille2Color, setFille2Color] = useState("black");
  const [lang, setLang] = useState("fr");
  const [garcon1Color, setGarcon1Color] = useState("black");
  const [garcon2Color, setGarcon2Color] = useState("black");
  const [selectedPicto, setSelectedPicto] = useState("fille1");

  const i18n = buildI18n(user);

  const resetColor = () => {
    setFille2Color("black");
    setFille1Color("black");
    setGarcon1Color("black");
    setGarcon2Color("black");
  };

  const onSubmitForm = () => {
    setErrorMessage("");

    let data = {
      name: name,
      birth_date: birth_date,
      image: selectedPicto,
      user_id: user.infos.id,
      lang: lang,
    };

    let error = formValidator(data);
    if (error === "") {
      saveSubUser(data).then((res) => {
        if (res.status === 200) {
          getAllSubuser(user.infos.id).then((result) => {
            loadUserInfo(true, user.infos, result.result, user.current_subuser);
            navigation.reset({
              index: 0,
              routes: [{ name: "ChangeAccount" }],
            });
          });
        } else {
          setErrorMessage(
            i18n.t(
              "error.enregistrement de l'utilisateur",
              "Erreur lors de l'enregistrement de l'utilisateur, veuillez réessayer ultérieurement."
            )
          );
        }
      });
    }
  };

  const formValidator = (data) => {
    let error = false;

    for (let key in data) {
      error = validateInputField(key, "string", data[key], i18n.t);
      if (error !== "") {
        setErrorMessage(error);
        return error;
      }
    }
    return "";
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.image}>
          <Header screen="ChangeAccount" navigation={navigation} />
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>
              {i18n.t("register.creation", "Créer un nouveau compte")}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                {i18n.t("register.name", "Ton prénom :")}
              </Text>
              <TextInput
                style={styles.input}
                type="text"
                placeholder="Prénom"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                {i18n.t(
                  "register.Ta date de naissance :",
                  "Ta date de naissance :"
                )}
              </Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={birth_date}
                mode="date"
                format="DD MMMM YYYY"
                confirmBtnText="Valider"
                locale="fr-FR"
                cancelBtnText="Annuler"
                customStyles={{
                  dateInput: {
                    marginLeft: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                  },
                }}
                onDateChange={(event, date) => {
                  setBirth_date(date);
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
                {i18n.t("register.Ta langue :", "Ta langue :")}
              </Text>
              <RNPickerSelect
                style={styles.selectInput}
                onValueChange={(value) => setLang(value)}
                items={optionsLang}
                doneText={"Valider"}
              >
                <Text
                  style={[styles.selectInput, { color: "grey", fontSize: 19 }]}
                >
                  {lang} ↓
                </Text>
              </RNPickerSelect>
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {i18n.t("register.Choisi ton perso :", "Choisi ton perso :")}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  resetColor();
                  setFille1Color("white");
                  setSelectedPicto("fille1");
                }}
              >
                <Image
                  source={fille1}
                  style={[styles.picto, { backgroundColor: fille1Color }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetColor();
                  setFille2Color("white");
                  setSelectedPicto("fille2");
                }}
              >
                <Image
                  source={fille2}
                  style={[styles.picto, { backgroundColor: fille2Color }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetColor();
                  setGarcon1Color("white");
                  setSelectedPicto("garcon1");
                }}
              >
                <Image
                  source={garcon1}
                  style={[styles.picto, { backgroundColor: garcon1Color }]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  resetColor();
                  setGarcon2Color("white");
                  setSelectedPicto("garcon2");
                }}
              >
                <Image
                  source={garcon2}
                  style={[styles.picto, { backgroundColor: garcon2Color }]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <Text style={styles.buttonText}>
                {" "}
                {i18n.t("register.save", "Enregistrer")}
              </Text>
            </TouchableOpacity>
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
  selectInput: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  checkbox: {
    width: wp("60%"),
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  errorMessage: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  picto: {
    width: 150,
    height: 150,
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
  },
  scrollContainer: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    textAlign: "center",
  },
  datePickerStyle: {
    width: 250,

    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    width: 200,
    borderRadius: 10,
    height: 40,
    marginBottom: 15,
    marginLeft: 10,
    paddingLeft: wp("5%"),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",

    height: Dimensions.get("window").height,
  },
  button: {
    backgroundColor: "#321aed",
    width: wp("40%"),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("30%"),
  },
  buttonText: {
    color: "white",
  },
});

mapDispatchToProps = {
  loadUserInfo,
};

mapStateToProps = (store) => {
  return {
    user: store.user,
    cycle: store.cycle,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSubuser);
