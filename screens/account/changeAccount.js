import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';
import {loadUserInfo} from '../../actions/user/userActions';
import {loadProgress} from '../../actions/progress/progressActions'
import {loadLevel} from '../../actions/level/levelActions';
import {getAllLevel,getCurrentLevel,getLevelByOrder} from '../../api/levelApi';
import {getStateByWeek} from '../../api/awardApi';
import {getCount} from '../../api/eventApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import fille1 from '../../assets/fille1.png'
import fille2 from '../../assets/fille2.png'
import garcon1 from '../../assets/garcon1.png'
import garcon2 from '../../assets/garcon2.png'



const ChangeAccount = ({ navigation,user,loadUserInfo,loadProgress,loadLevel})=>{

  const subuser = []

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_subuser', ""+value)
    } catch (e) {
      // saving error
    }
  }

  const setImage = (player) => {
    switch (player.image) {
      case 'fille1':
        return <Image style={styles.picto} source={fille1} />
        break;
        case 'fille2':
          return <Image style={styles.picto} source={fille2} />
          break;
       case 'garcon1':
          return <Image style={styles.picto} source={garcon1} />
          break;
          case 'garcon2':
            return <Image style={styles.picto} source={garcon2} />
            break;
      default:
        break;
    }
  }
    return (
        <View style={styles.container}>
          <Header screen='ChangeAccount' navigation={navigation}/>
            <ImageBackground source={background} style={styles.image}>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              {user.subuser.map((player,index)=> {
                let age = Math.floor( (new Date()).getTime()-(new Date(player.birth_date)).getTime()) / (365.24*24*3600*1000)
                let user_age = Math.trunc(age)
                let image = '../../assets/'+player.image
                return (<TouchableOpacity key={index}
                  style={styles.subuser}
                            onPress={ ()=>{
                              getCount(user.subuser[index].id,moment(new Date()).format('W')).then(
                                (resultobj)=> {
                                    getStateByWeek(moment(new Date()).format('W'), user.subuser[index].id).then(
                                      async (resultstate)=> {
                                            loadUserInfo(user.infos, user.subuser, index)
                                            loadProgress(resultstate.result[0].state,resultobj.result[0].obj)
                                            storeData(index)
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Home' }],
                                            })                                            
                                        }
                                      )
                                }
                              )
                              getAllLevel(user.subuser[index].id).then(
                                (result)=>{
                                    getStateByWeek(moment(new Date()).format('W')-1, user.subuser[index].id).then(
                                        (resultstate)=> {
                                            let currentlevel = getCurrentLevel(result,resultstate.result[0].state)
                                            let nextLevel = getLevelByOrder(result,currentlevel[0].ordre+1)
                                            loadLevel(result,currentlevel[0],nextLevel[0])
                                        }
                                    )
                                    
                                }
                            )
                            }
                            }
                          
                        >
                            {setImage(player)}
                            <Text key={index} style={styles.title}>{player.name}</Text>
                        </TouchableOpacity>)
              })}
              
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={(e)=>{
                  navigation.reset({
                      index: 0,
                      routes: [{ name: 'AddSubuser' }],
                  });}}
              >
              <Text style={styles.buttonText}>Ajouter un compte</Text>
              </TouchableOpacity>
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    picto:{
      height:hp('25%'),
      width:hp('25%')
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems:'center'
    },
    logo:{
      width:80,
      height:80, 
      position:'absolute',
      left:10,
      top:10
    },
    subuser:{
      marginLeft:15,
      marginRight:15,
      borderColor:'white',
      borderWidth:1,
      borderRadius:10,
      padding:10
    },
    title:{
      color:'white',
      textAlign:'left',
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
    },
    button: {
      backgroundColor: "#321aed",
      width: wp('20%'),
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop:30,
      borderRadius:10
      },
      buttonText: {
        color: "white",
        fontSize:20
      }
  });

mapDispatchToProps = {
  loadUserInfo,
  loadProgress,
  loadLevel
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        cycle: store.cycle,
        level:store.level
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(ChangeAccount);