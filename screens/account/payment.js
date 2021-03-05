
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';

const Payment = (props)=>{

  // Stripe.setOptionsAsync({
  //   publishableKey: 'pk_test_51I6vy9JwXSakrFauRRfQLrkQvat3WF9g4MGNiH4uUHYasoeXeZAwOXcqD6cmvph6qSVo8Ob0OQTBZ2me7hrtQhgI00TrQZTw4x'
  // });

  // const params = {
  //   // mandatory
  //   number: '4242424242424242',
  //   expMonth: 11,
  //   expYear: 17,
  //   cvc: '223',
  //   // optional
  //   name: 'Test User',
  //   currency: 'usd',
  //   addressLine1: '123 Test Street',
  //   addressLine2: 'Apt. 5',
  //   addressCity: 'Test City',
  //   addressState: 'Test State',
  //   addressCountry: 'Test Country',
  //   addressZip: '55555',
  // };
  
  //const token = await Stripe.createTokenWithCardAsync(params);

  return (
        
    <View style={styles.container}>
       <Text style={styles.text}>Paiment</Text>
    </View>
    
);
}



const styles = StyleSheet.create({

container: {
  height:hp('80%'),
  width:wp('40%'),
  backgroundColor: '#CAE6FF',
  borderRadius:10,
  borderColor: '#CAE6FF',
  borderWidth:1,
  padding:'8%',
  marginLeft:wp('30%'),
  position:'absolute',
  display:'flex',
  alignItems: "center",
  justifyContent:'space-around'
},
title:{
    
    marginBottom:'20%',
    textAlign:'center',
    fontSize:30,
    color:'grey'
},

inputTime: {
    backgroundColor: 'white',
    width: 50,
  height: 40,
  borderRadius:5,
  marginLeft:10,
  paddingLeft:12,
  marginTop:40,
  },
  text:{
    color:'black',
    textAlign:'center',
    marginTop:50,
    marginLeft:15,
    fontSize:15
  },
comment :{
    backgroundColor: 'white',
    borderRadius:5,
    height: 100,
    textAlign:'left',
    width:'90%',
    marginTop:20,
  paddingLeft:12
},
input: {
backgroundColor: 'white',
borderRadius:5,
  height: 40,
  width:'70%',
  marginBottom: 15,
  textAlign:'left',
  paddingLeft:12
},
datePickerStyle: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  }, 
  button: {
    backgroundColor: "grey",
    height: 40,
    borderRadius:8,
    width:'50%',
    marginTop:60,
    textAlign:'center',
    alignItems: "center",
    justifyContent: "center",

  },
  buttonText: {
      color: "white"
  },
  close: {
    position:'absolute',
    height:'10%',
    width:'10%',
    marginTop:'10%',
    right:'5%'
  },
  closeText:{
      color:'red',
      fontSize:20
  },
  errorMessage: {
    fontSize: 20,
    position:'absolute',
    textAlign: 'center',
    marginTop: '10%',
    color: "red"
  },
}
);

mapDispatchToProps = {
  
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        agenda: store.agenda,
        progress: store.progress
    }
}


export default  connect(mapStateToProps, mapDispatchToProps)(Payment);
