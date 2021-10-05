import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { config } from "../config";
import { Icon } from "react-native-elements";
import axios from "axios";
import { View, Modal } from "react-native";
import { updatestripe } from "../api/userApi";
import { connect } from "react-redux";
import { getUserBy } from "../api/userApi";

const AddPaymentMethod = (props) => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    getUserBy(props.user.infos.id).then((res) => {});
    let data = {
      email: props.user.infos.email,
      priceId: props.route.params.priceId,
    };
    const apiCall = async () => {
      try {
        axios
          .post(config.api_url + "/api/v1/paiment/checkout", data)
          .then((res) => {
            setSessionId(res.data.sessionId);
          });
      } catch (error) {
        console.log(error);
      }
    };
    apiCall();
  }, []);

  const redirect = (navState) => {
    if (navState.url.includes("webapp-4b.herokuapp.com")) {
      getUserBy(props.user.infos.id).then((res) => {});
      props.navigation.reset({
        index: 0,
        routes: [{ name: "MainAccount" }],
      });
    }
  };

  if (!sessionId)
    return (
      <View>
        <Icon
          name="spinner"
          type="font-awesome"
          color="black"
          style={{ marginTop: "50%" }}
        />
      </View>
    );
  return (
    <>
      {sessionId ? (
        <WebView
          allowFileAccess={true}
          scalesPageToFit={false}
          originWhitelist={["*"]}
          source={{
            uri: `https://paiment-4brn.herokuapp.com/` + sessionId,
          }}
          onNavigationStateChange={(navState) => {
            redirect(navState);
          }}
        />
      ) : null}
    </>
  );
};

mapDispatchToProps = {};

mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethod);
