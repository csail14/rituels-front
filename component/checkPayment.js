import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {config} from '../config';

import axios from "axios";
import { View } from "react-native";

const AddPaymentMethod = () => {

  const [url, setUrl] = useState(null);
  const sessionId ='cs_test_a1peUyAe8mDhhyrBRw9SosdMgaDQg5PmVmBvAxHGowuCyRrXo74y6vFh61'
  
console.log('checkpayment')
  useEffect(() => {
    let data = {
        sessionId:sessionId
    }
    const apiCall = async () => {
      try {
        axios.post(config.api_url+'/customer-portal',data).then(
            (res)=>{
                setUrl(res.data.url);
                console.log(res)
            }
        )
      } catch (error) {
        console.log(error);
      }
    };
    apiCall();
  }, []);

  if (!url) return<View></View> ;
  return (
    <>
      {url ? (
        <WebView
          allowFileAccess={true}
          scalesPageToFit={false}
          originWhitelist={["*"]}
          source={{
            uri: url,
          }}
          onNavigationStateChange={(navState) => {}}
        />
      ) : null}
    </>
  );
};

export default AddPaymentMethod;