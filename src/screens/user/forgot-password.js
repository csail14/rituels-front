import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
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
import { loginUser, forgotPassword } from "../../api/userApi";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../navigation/header";

import { connect } from "react-redux";
import { loadUserInfo } from "../../actions/user/userActions";
import i18n from "../../i18n/index";

const ForgotPassword = (props) => {
  const [email, setemail] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const onSubmitForm = () => {
    let data = {
      email: email,
    };
    forgotPassword(data).then((res) => {
      seterrorMessage("");
      if (res.status === 200) {
        window.alert(
          i18n.t(
            "login.Un email vous a été envoyé",
            "Un email vous a été envoyé"
          )
        );
      } else {
        seterrorMessage(
          i18n.t(
            "login.error",
            "Un problème est survenu, veuillez reessayer plus tard."
          )
        );
      }
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <Header screen="Login" navigation={props.navigation} />
        <ImageBackground source={background} style={styles.image}>
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.title}>
              {" "}
              {i18n.t("login.forgotPassword", "Mot de passe oublié ?.")}
            </Text>
            <Text></Text>
            <TextInput
              style={styles.input}
              type="text"
              placeholderTextColor="grey"
              placeholder={i18n.t("register.email", "Email")}
              valeur={email}
              autoCapitalize="none"
              onChangeText={(text) => {
                setemail(text);
              }}
            />
            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                onSubmitForm();
              }}
            >
              <Text style={styles.buttonText}>
                {i18n.t("login.send", "Envoyer")}
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
  errorMessage: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  scrollContainer: {
    flex: 1,
    width: wp("100%"),
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
    paddingTop: wp("20%"),
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
