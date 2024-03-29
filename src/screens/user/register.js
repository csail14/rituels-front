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
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/rituals-background.jpg";
import { saveUser } from "../../api/userApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../navigation/header";
import { validateInputField } from "../../helpers/form-validator";
import { useIsFocused } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import { loadUserInfo } from "../../actions/user/userActions";
import RNPickerSelect from "react-native-picker-select";
import { buildI18n } from "../../i18n/index";

const Register = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [lang, setLang] = useState("FR");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [cgu, setcgu] = useState(false);
  const i18n = buildI18n();
  const onSubmitForm = () => {
    setErrorMessage("");

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      lang: lang,
      stripe_id: null,
      isPaid: false,
    };
    let error = formValidator(data);
    if (error === "") {
      saveUser(data).then((res) => {
        if (res.status === 501) {
          setErrorMessage(
            i18n.t(
              "register.email utilisé",
              "Cet email est déjà utilisé, veuillez vous connecter ou en choisir un autre."
            )
          );
        } else if (res.status === 200) {
          clearform();
          setErrorMessage(
            i18n.t(
              "register.validation compte",
              "Rendez vous dans votre boite mail pour valider votre compte."
            )
          );
        } else {
          setErrorMessage(
            i18n.t(
              "register.error",
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
    if (validateInputField("mail", "email", data.email, i18n.t) !== "") {
      setErrorMessage(validateInputField("mail", "email", data.email, i18n.t));
      return validateInputField("email", "email", data.email, i18n.t);
    }
    if (data.password !== data.passwordConfirm) {
      setErrorMessage(
        i18n.t(
          "register.error mdp",
          "Les deux mots de passe ne sont pas identiques."
        )
      );
      return i18n.t(
        "register.error mdp",
        "Les deux mots de passe ne sont pas identiques."
      );
    }
    if (!cgu) {
      setErrorMessage(
        i18n.t(
          "register.cguAccept",
          "Veuillez accepter les conditions générales d'utilisation."
        )
      );
      return i18n.t(
        "register.cguAccept",
        "Veuillez accepter les conditions générales d'utilisation."
      );
    }
    return "";
  };

  const optionsLang = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "es", label: "Espagnol" },
  ];

  const clearform = () => {
    setFirstName("");
    setLastName("");
    setemail("");
    setpassword("");
    setpasswordConfirm("");
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Register" navigation={navigation} />
        <ImageBackground source={background} style={styles.image}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>
              {" "}
              {i18n.t("register.creation", "Créer un nouveau compte")}
            </Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              type="text"
              placeholder={i18n.t("register.prenom", "Prénom")}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              type="text"
              placeholder={i18n.t("register.nom", "Nom")}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              value={email}
              autoCapitalize="none"
              type="text"
              placeholder={i18n.t("register.email", "Email")}
              onChangeText={(text) => {
                setemail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              type="password"
              value={password}
              secureTextEntry={true}
              placeholder={i18n.t("register.mdp", "Mot de passe")}
              onChangeText={(text) => {
                setpassword(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              type="password"
              value={passwordConfirm}
              secureTextEntry={true}
              placeholder={i18n.t(
                "register.confirm mdp",
                "Confirmation mot de passe"
              )}
              onChangeText={(text) => {
                setpasswordConfirm(text);
              }}
            />
            <RNPickerSelect
              style={styles.input}
              onValueChange={(value) => setLang(value)}
              items={optionsLang}
              doneText={"Valider"}
            >
              <Text style={[styles.input, { color: "grey", paddingTop: 10 }]}>
                {optionsLang.filter((item) => item.value === lang)[0]
                  ? optionsLang.filter((item) => item.value === lang)[0].label
                  : "Choisissez votre langue"}{" "}
                ↓
              </Text>
            </RNPickerSelect>
            <CheckBox
              title={i18n.t(
                "register.cgu",
                "J'accepte les conditions générales d'utilisation"
              )}
              checked={cgu}
              onPress={() => setcgu(!cgu)}
              containerStyle={styles.checkbox}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <Text style={styles.buttonText}>
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
  title: {
    fontSize: 20,
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
  footer: {
    position: "absolute",
    bottom: 0,
    right: 1,
    left: 1,
    height: 50,
  },
  scrollContainer: {
    flex: 1,
    width: wp("100%"),
    minHeight: hp("100%"),
    textAlign: "center",
  },
  picker: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  input: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 40,
    marginBottom: 15,
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingTop: wp("10%"),
    height: Dimensions.get("window").height,
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

export default Register;
