import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/main-background.jpg";
import Header from "../../navigation/header-account";
import { connect } from "react-redux";
import { buildI18n } from "../../i18n/index";

const Notification = ({ navigation, user }) => {
  const i18n = buildI18n(user);
  return (
    <View style={styles.container}>
      <Header screen="Notification" navigation={navigation} />

      <ImageBackground source={background} style={styles.image}>
        <Text style={styles.title}>
          {" "}
          {i18n.t("account.notif", "Notification")}
        </Text>
      </ImageBackground>
    </View>
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
  title: {
    color: "white",
    textAlign: "left",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 30,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
  },
});

mapDispatchToProps = {};

mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
