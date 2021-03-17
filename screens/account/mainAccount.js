import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Switch,TextInput} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';
import {setNotification } from '../../api/userApi'
import * as Permissions from 'expo-permissions';
import {registerForPushNotificationsAsync} from '../../helpers/notification'
import Payment from '../account/payment'
import {loadUserInfo} from '../../actions/user/userActions'



const MainAccount = ({ navigation,user,loadUserInfo })=>{
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    let data ={
      notification:!isEnabled
    }
    setNotification(data, user.infos.id)
    .then( ()=>{
      let newuser = user.infos
      newuser.notification=data.notification
      loadUserInfo(newuser, user.subuser, user.current_subuser)
    }
      
    )
  };


  useEffect(()=>{
    if(user.infos.notification=='true' || user.infos.notification==1){
      setIsEnabled(true)
    }
  }, [])

  const saveUuid = async (account,second_uuid) =>{
    let token = await registerForPushNotificationsAsync(user.infos.id,account,second_uuid)
    let user_info=user.infos
    if(account=='first'){
      user_info.uuid=token
    }
    else if(account='second'){
      user_info.second_uuid=token
    }
    loadUserInfo(user_info, user.subuser, user.current_subuser)
  }

    return (
        <View style={styles.container}>
          <Header screen='MainAccount' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            
              <Text style={styles.title}>{user.infos.firstName} {user.infos.lastName}</Text>
              <Text style={styles.title}>{user.infos.email}</Text>
              
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
              {isEnabled&&<View>
                  
                  <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
                      <TouchableOpacity onPress={()=>{
                        saveUuid('first',user.infos.second_uuid)
                        
                      }} style={styles.notifButton}><Text style={styles.text}>Ajouter cet appareil comme principal</Text></TouchableOpacity>
                      <TouchableOpacity  onPress={()=>{
                        saveUuid('second',user.infos.uuid)
                      }} style={styles.notifButton}><Text style={styles.text}>Ajouter cet appareil en secondaire</Text></TouchableOpacity>
                  </View>
              </View>}
              <View>
              <TouchableOpacity style={[styles.button]}
                onPress={()=>{
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Payment' }],
                    })
                }}>
                  <Text style={styles.text}>Acceder moyen de paiement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}
                onPress={()=>{
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'AddPayment' }],
                    })
                }}>
                  <Text style={styles.text}>Ajouter un moyen de paiement</Text>
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
      width: 50,
    height: 40,
    borderRadius:5,
    marginLeft:10,
    paddingLeft:12,
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
  loadUserInfo
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(MainAccount);