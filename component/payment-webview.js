import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {config} from '../config';

import axios from "axios";
import { View } from "react-native";

const AddPaymentMethod = () => {

  const [sessionId, setSessionId] = useState(null);
  console.log('add methode')
  useEffect(() => {
    const apiCall = async () => {
      try {
        axios.post(config.api_url+'/api/v1/paiment/checkout').then(
            (res)=>{
                setSessionId(res.data.sessionId);
            }
        )
      } catch (error) {
        console.log(error);
      }
    };
    apiCall();
  }, []);
  console.log('session', sessionId)
  if (!sessionId) return<View></View> ;
  return (
    <>
      {sessionId ? (
        <View>
        <WebView
          allowFileAccess={true}
          scalesPageToFit={false}
          originWhitelist={["*"]}
          source={{
            uri: `https://paiment-4brn.herokuapp.com/`+sessionId,
          }}
          onNavigationStateChange={(navState) => {}}
        />
        </View>
      ) : null}
    </>
  );
};

export default AddPaymentMethod;