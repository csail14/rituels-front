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
import { Icon,CheckBox } from 'react-native-elements'
import { inlineStyles } from 'react-native-svg';




const MainAccount = ({ navigation,user,loadUserInfo })=>{
  
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPaid, setIsPaid] = useState(user.infos.isPaid)
  const [selectedPackId,setSelectedPackId] = useState(null)
  const [kidsPack,setKidsPack] = useState(false)
  const [familyPack, setFamilyPack] = useState(false)

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

  const selectPack = (pack) => {
    switch (pack) {
      case ('kids'):
        setKidsPack(true)
        setFamilyPack(false)
        setSelectedPackId('price_1IZDjWJwXSakrFau37sJondx')
        break;
        case ('family'):
          setKidsPack(false)
          setFamilyPack(true)
          setSelectedPackId('price_1IZDkSJwXSakrFauYSsgNXAi')
          break;
      
      default:
        break;
    }
  }

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
              {isPaid==1&&<>
              <Text style={styles.text}>Votre moyen de paiment est à jour !  <Icon name='check-square' type='font-awesome'color='green'/></Text>
              <TouchableOpacity style={[styles.button]}
                onPress={()=>{
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Payment' }],
                    })
                }}>
                  <Text style={styles.text}>Voir mon moyen de paiement</Text>
                </TouchableOpacity></>}
                {isPaid==1&&<>
                <Text  style={styles.text}>Choisissez un pack :</Text>
                <View style={styles.packContainer}>
                  <TouchableOpacity style={styles.pack} onPress={()=>{selectPack('kids')}}>
                    <Text style={styles.text}>Pack Kids</Text>
                    <Text style={styles.text}>3€/mois</Text>
                    <CheckBox
                      center
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={kidsPack}
                      onPress={()=>{selectPack('kids')}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pack} onPress={()=>{selectPack('family')}}>
                  <Text style={styles.text}>Pack Family</Text>
                    <Text style={styles.text}>5€/mois</Text>
                    <CheckBox
                      center
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={familyPack}
                      onPress={()=>{selectPack('family')}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button]}
                onPress={()=>{
                  console.log('go to addPayment')
                  navigation.
                  navigate('AddPayment',{priceId:selectedPackId})
                }}>
                  <Text style={styles.text}>Ajouter un moyen de paiement</Text>
                </TouchableOpacity></>}
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
    packContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      paddingTop:10,
      paddingBottom:10

    },
    pack:{
      borderColor:'white',
      borderRadius:10,
      borderWidth:2,
      margin:10,
      paddingRight:10,
      paddingBottom:10,
      width:wp('15%')
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
      marginLeft: wp('30%'),
      borderRadius:5
      },
    title:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      marginRight:15,
      fontSize:30
    },
    text:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      marginBottom:10,
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