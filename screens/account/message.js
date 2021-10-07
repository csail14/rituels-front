import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/main-background.jpg";
import Header from "../../navigation/header-account";
import { validateInputField } from "../../helpers/form-validator";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendContactMessage } from "../../api/userApi";

const Message = ({ navigation, user }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitForm = () => {
    setErrorMessage("");

    let data = {
      firstName: user.infos.firstName,
      lastName: user.infos.lastName,
      email: user.infos.email,
      message: message,
      id: user.infos.id,
    };
    let error = formValidator(data);

    if (error === "") {
      sendContactMessage(data).then((res) => {
        if (res.status == 200) {
          setErrorMessage("Votre message a bien été envoyé.");
        } else {
          setErrorMessage("Erreur lors de l'envoi de votre message.");
        }
      });
    }
  };

  const formValidator = (data) => {
    let error = false;

    for (let key in data) {
      error = validateInputField(key, "string", data[key]);
      if (error !== "") {
        setErrorMessage(error);
        return error;
      }
    }
    if (validateInputField("mail", "email", data.email) !== "") {
      setErrorMessage(validateInputField("mail", "email", data.email));
      return validateInputField("email", "email", data.email);
    }
    return "";
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Message" navigation={navigation} />

        <ImageBackground source={background} style={styles.image}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>Envoyez-nous un message</Text>

            <TextInput
              style={styles.inputMessage}
              value={message}
              type="text"
              placeholder="Message"
              onChangeText={(text) => {
                setMessage(text);
              }}
            />

            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                e.preventDefault();
                onSubmitForm();
              }}
            >
              <Text style={styles.buttonText}>Envoyer</Text>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  errorMessage: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 30,
    marginBottom: 15,
  },
  scrollContainer: {
    flex: 1,
    width: wp("100%"),
    minHeight: hp("100%"),
    textAlign: "center",
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
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
  },
  inputMessage: {
    backgroundColor: "white",
    width: wp("60%"),
    height: 200,
    marginBottom: 15,
    alignItems: "center",
    marginLeft: wp("20%"),
    paddingLeft: wp("5%"),
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

mapDispatchToProps = {};

mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Message);
