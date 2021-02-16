import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Image,TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../assets/main-background.jpg'
import Header from '../navigation/header'
import HeaderLog from '../navigation/header-log'
import {connect} from 'react-redux';
import Menu from '../component/go'
import logo from '../assets/logo.png'
import axios from 'axios';
import {config} from '../config';
import LevelBar from '../component/levelbar'
import {loadCycleInfo} from '../actions/cycle/cycleActions'


const Home = ({ navigation,user,progress, loadCycleInfo, cycle })=>{

  useEffect(()=>{
    if(user.isLogged===false){
      axios.get(config.api_url+"/")
            .then((response)=>{
                return response.data;
            })}}, [])

    return (
        <View style={styles.container}>
          {user && user.isLogged ? <HeaderLog screen='Home' navigation={navigation}/>: <Header screen='Home' navigation={navigation}/>}
          
            <ImageBackground source={background} style={styles.image}>
            
              {user.infos &&
              <> 
              
              <Menu loadCycleInfo={loadCycleInfo} allcycle={cycle.allCycle} navigation={navigation}/>
              <View style={styles.levelbar}>
              <LevelBar   obj={progress.obj} state={progress.state}/>
              <Text style={styles.text}>Rituels : {progress.state}/{progress.obj}</Text>
              </View>
                
                <Text style={styles.subTitle}>Bonjour {user.infos.firstName}</Text>
              
              
              </>}
              {user.isLogged===false&&<View style={{display:'flex', flex:1}}>
                  <Text style={styles.title}>Bienvenue sur  4b Premium</Text>
                  <View style={styles.buttonContainer}>
                    <View style={{display:'flex', alignItems:'center', marginBottom:20}}>
                      <Text style={styles.subTitle}>Déjà un compte ? </Text>
                      <TouchableOpacity 
                        style={styles.link}
                        onPress={
                          () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                              });}
                        }>
                          <Text  style={{color:"white", fontSize:20}}>Se connecter </Text>    
                      </TouchableOpacity>
                    </View>
                    <View style={{display:'flex', alignItems:'center', marginBottom:20}}>
                    <Text style={styles.subTitle}>Nouveau sur 4b ?</Text>
                      <TouchableOpacity
                          style={styles.link}
                          onPress={
                            () => {
                              navigation.reset({
                                  index: 0,
                                  routes: [{ name: 'Register' }],
                                });}
                          }
                      >
                        <Text  style={{color:"white", fontSize:20}}>Créer un compte </Text>    
                        </TouchableOpacity>
                    </View>
                    <View style={{display:'flex', alignItems:'center', marginBottom:20}}>
                    <Text style={styles.subTitle}>Plus d'information sur 4b :</Text>
                      <TouchableOpacity
                          style={styles.link}
                          onPress={
                            () => {
                              navigation.reset({
                                  index: 0,
                                  routes: [{ name: 'HowAppWork' }],
                                });}
                          }
                      >
                        <Text  style={{color:"white", fontSize:20}}>Cliquez-ici </Text>    
                        </TouchableOpacity>
                        
                               
                    </View>
                    
                  </View>
                  
                </View>
              }
            <Image source={logo} style={styles.logo}/>
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    buttonContainer:{
      marginTop:wp('0%')
    },
    logo:{
      width:80,
      height:80, 
      position:'absolute',
      left:10,
      top:10
    },
    levelbar:{
      position:'absolute',
      right:10,
      bottom:10
    },
    title: {
      fontSize: 40,
      textAlign: 'center',
      color: "white",
      paddingBottom:hp('10%'),
      display:'flex'
    },
    subTitle: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 20,
      color: "white"
    },
    header: {
      height:100
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize:20,
        marginTop:10
    },
    scrollContainer: {
      width: wp('100%'),
      textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        width: wp('60%'),
      height: 40,
      marginBottom: 15,
      marginLeft: wp('20%'),
      paddingLeft: wp('5%')
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },

    link: {
      backgroundColor: "#321aed",
      justifyContent: "center",
      borderRadius:5,
      padding:20,
    },
    commande: {
        flex:1
    },
    validateContainer: {
        flex: 3
    }
  });

mapDispatchToProps = {
  loadCycleInfo
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        progress: store.progress,
        cycle: store.cycle
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Home);