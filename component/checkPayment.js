import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import {config} from '../config';
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux';
import axios from "axios";
import { View } from "react-native";

const AddPaymentMethod = (props) => {

  const [url, setUrl] = useState(null);
  const sessionId ='cs_test_a1peUyAe8mDhhyrBRw9SosdMgaDQg5PmVmBvAxHGowuCyRrXo74y6vFh61'
  
console.log('checkpayment', props.user.infos.stripe_id)
  useEffect(() => {
    let data = {
        customerId:props.user.infos.stripe_id
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

  const redirect = (navState)=>{
    if(navState.url.includes('webapp-4b.herokuapp.com')){
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'MainAccount' }],
      })

    }
  }

  if (!url) return<View><Icon name='spinner' type='font-awesome'color='black' style={{marginTop:'50%'}} /></View> ;
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
          onNavigationStateChange={(navState) => {
            redirect(navState)
          }}
        />
      ) : null}
    </>
  );
};

mapDispatchToProps = {
  
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(AddPaymentMethod);