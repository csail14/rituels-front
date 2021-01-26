import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';


const Stats = ({ navigation,user })=>{
    return (
        <View style={styles.container}>
          <Header screen='Home' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            
              <Text>Stats</Text>
              
            
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
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Stats);