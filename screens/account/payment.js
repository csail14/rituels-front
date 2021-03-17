
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import AddWebview from '../../component/payment-webview'
import Webview from '../../component/checkPayment'
import React, { Component } from 'react';
import Header from '../../navigation/header-account'


const Payment = (props)=>{

  
console.log(props.route.name)
  return (
    <View><AddWebview/></View>
    
    //     <View>
    //       <Header screen='MainAccount' navigation={props.navigation}/>
    //       {props.route.name=="AddPayment"&&<AddWebview/>}
    //       {props.route.name=="Payment"&&<Webview/>}
    // </View>
    
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


export default  Payment;
