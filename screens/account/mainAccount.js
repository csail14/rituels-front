import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Switch,TextInput} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';
import * as Permissions from 'expo-permissions';
import {registerForPushNotificationsAsync} from '../../helpers/notification'
import Payment from '../account/payment'




const MainAccount = ({ navigation,user })=>{
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
          <Header screen='MainAccount' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            
              <Text style={styles.title}>{user.infos.firstName} {user.infos.lastName}</Text>
              <Text style={styles.title}>{user.infos.email}</Text>
              <Text style={styles.title}>Paramètres de notifications : </Text>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
                <Text style={styles.text}>Activer les notifications : </Text>
                <Switch
                  style={styles.title}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
                <Text style={styles.text}>M'alerter </Text>
                <TextInput
                  style={styles.input}
                />
                <Text style={styles.text}>minutes avant le début. </Text>
              </View>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
                  <TouchableOpacity onPress={()=>{
                    registerForPushNotificationsAsync(user.infos.id)
                  }} style={styles.notifButton}><Text style={styles.text}>Ajouter cet appareil comme principal</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.notifButton}><Text style={styles.text}>Ajouter cet appareil en secondaire</Text></TouchableOpacity>
              </View>
             
              <View>
                <TouchableOpacity style={[styles.button]}>
                  <Text style={styles.text}>Information de paiement</Text>
                </TouchableOpacity>
              </View>
              
            
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent:'center'
    },
    notifButton:{
      borderWidth:1,
      borderColor:'white',
      margin:5,
      padding:10,
      paddingTop:0,
      borderRadius:40
    },
    image: {
      flex: 1,
      resizeMode: "cover"
    },
    
    input: {
      backgroundColor: 'white',
      width: 10,
    height: 40,
  
    },
    button: {
      backgroundColor: "#321aed",
      width: wp('40%'),
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop:10,
      marginLeft: wp('30%')
      },
    title:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      fontSize:30
    },
    text:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      fontSize:20
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(MainAccount);