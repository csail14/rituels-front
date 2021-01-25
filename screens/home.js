import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../assets/main-background.jpg'
import Header from '../navigation/header'
import HeaderLog from '../navigation/header-log'
import {connect} from 'react-redux';
import Menu from '../component/menu'


const Home = ({ navigation,user })=>{
    return (
        <View style={styles.container}>
          {user && user.isLogged ? <HeaderLog screen='Home' navigation={navigation}/>: <Header screen='Home' navigation={navigation}/>}
          
            <ImageBackground source={background} style={styles.image}>
            
              {user.infos && <Menu navigation={navigation}/>}
              {user.isLogged===false&&<View style={{display:'flex', justifyContent:'center'}}>
                  <Text style={styles.title}>Bienvenue sur l'application 4Br'N</Text>
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
                    <Text style={styles.subTitle}>Nouveau sur 4Br'N ?</Text>
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
                    <Text style={styles.subTitle}>Pour plus d'information sur le principe de 4Br'N</Text>
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
    title: {
      fontSize: 40,
      textAlign: 'center',
      color: "white",
      marginBottom:40,
      backgroundColor: 'black',
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
        textAlign: 'center'
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

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Home);