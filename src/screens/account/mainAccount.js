import React, { useState, useEffect, useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import background from "../../assets/main-background.jpg";
import Header from "../../navigation/header-account";
import { connect } from "react-redux";
import { setNotification } from "../../api/userApi";
import { registerForPushNotificationsAsync } from "../../helpers/notification";
import { loadUserInfo } from "../../actions/user/userActions";
import { Icon } from "react-native-elements";
import { buildI18n } from "../../i18n/index";

const MainAccount = ({ navigation, user, loadUserInfo }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPaid, setIsPaid] = useState(user.infos ? user.infos.isPaid : 0);
  const i18n = buildI18n(user);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    let data = {
      notification: !isEnabled,
    };
    setNotification(data, user.infos.id).then(() => {
      let newuser = user.infos;
      newuser.notification = data.notification;
      loadUserInfo(true, newuser, user.subuser, user.current_subuser);
    });
  };

  useEffect(() => {
    if (
      user.infos &&
      (user.infos.notification == "true" || user.infos.notification == 1)
    ) {
      setIsEnabled(true);
    }
  }, []);

  const OpenURLButton = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const saveUuid = async (account, second_uuid) => {
    let token = await registerForPushNotificationsAsync(
      user.infos.id,
      account,
      second_uuid
    );
    let user_info = user.infos;
    if (account == "first") {
      user_info.uuid = token;
    } else if ((account = "second")) {
      user_info.second_uuid = token;
    }
    loadUserInfo(true, user_info, user.subuser, user.current_subuser);
  };
  return (
    <View style={styles.container}>
      <Header screen="MainAccount" navigation={navigation} />

      <ImageBackground source={background} style={styles.image}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            height: hp("120%"),
          }}
        >
          {user.infos ? (
            <>
              <Text style={styles.title}>
                {user.infos.firstName} {user.infos.lastName}
              </Text>
              <Text style={styles.title}>{user.infos.email}</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Text style={styles.text}>
                  {" "}
                  {i18n.t(
                    "account.notification",
                    "Activer les notifications :"
                  )}
                </Text>
                <Switch
                  style={styles.title}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              {isEnabled && (
                <View>
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
                        saveUuid("first", user.infos.second_uuid);
                      }}
                      style={styles.notifButton}
                    >
                      <Text style={styles.text}>
                        {i18n.t(
                          "account.addDevice",
                          " Ajouter cet appareil comme principal"
                        )}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        saveUuid("second", user.infos.uuid);
                      }}
                      style={styles.notifButton}
                    >
                      <Text style={styles.text}>
                        {i18n.t(
                          "account.addDevice2",
                          " Ajouter cet appareil en secondaire"
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View>
                <>
                  {isPaid ? (
                    <Text style={styles.text}>
                      {i18n.t(
                        "account.paid",
                        " Votre moyen de paiment est à jour !"
                      )}{" "}
                      <Icon
                        name="check-square"
                        type="font-awesome"
                        color="green"
                      />
                    </Text>
                  ) : (
                    <Text style={styles.text}>
                      {i18n.t(
                        "account.rdv",
                        "Rendez-vous sur le site pour gérer votre moyen de paiement et choisir votre pack !"
                      )}
                      <Icon
                        name="check-square"
                        type="font-awesome"
                        color="green"
                      />
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      OpenURLButton("http://4bpremium.com/account");
                    }}
                    style={[styles.button]}
                  >
                    <Text style={styles.text}>
                      {" "}
                      {i18n.t("account.options", "Gérer mes options")}
                    </Text>
                  </TouchableOpacity>
                  {!isPaid && (
                    <Text style={styles.text}>
                      {i18n.t(
                        "account.trial",
                        "Profitez de 7 jours d'essai gratuit !"
                      )}
                    </Text>
                  )}
                </>
              </View>
            </>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  packContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  pack: {
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    paddingRight: 10,
    paddingBottom: 10,
    width: 150,
  },
  notifButton: {
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
    padding: 10,
    paddingTop: 0,
    borderRadius: 40,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },

  input: {
    backgroundColor: "white",
    width: 50,
    height: 40,
    borderRadius: 5,
    marginLeft: 10,
    paddingLeft: 12,
  },
  button: {
    backgroundColor: "#321aed",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 30,
  },
  text: {
    color: "white",
    flexWrap: "wrap",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
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
export default connect(mapStateToProps, mapDispatchToProps)(MainAccount);
