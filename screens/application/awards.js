import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {BarChart  } from "react-native-chart-kit";
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';
import {getstatbymonth,getstatbyweek} from '../../api/statApi';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const Awards = ({ navigation,user })=>{

 
    return (
        <View style={styles.container}>
          <Header screen='Awards' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            <Text  style={styles.text}>Awards</Text>
            
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text:{
      color:'white',
      textAlign:'center',
      fontSize:30
    },
    boutonView:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
    },
    textbouton:{
      backgroundColor:'#bdbdde',
      padding:20,
      color:'white',
      borderColor:'white',
      borderRadius:100
    },
    button:{
      borderRadius:100
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Awards);