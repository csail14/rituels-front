import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';
import {loadUserInfo} from '../../actions/user/userActions';
import {loadProgress} from '../../actions/progress/progressActions'
import {getStateByWeek} from '../../api/awardApi';
import {getCount} from '../../api/eventApi';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');



const ChangeAccount = ({ navigation,user,loadUserInfo,loadProgress})=>{

  const subuser = []

  console.log(user.subuser)
    return (
        <View style={styles.container}>
          <Header screen='ChangeAccount' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              {user.subuser.map((player,index)=> {
                return (<TouchableOpacity key={index}
                            onPress={()=>{
                              
                              getCount(user.subuser[index].id,moment(new Date()).format('W')).then(
                                (resultobj)=> {
                                    getStateByWeek(moment(new Date()).format('W'), user.subuser[index].id).then(
                                        (resultstate)=> {
                                          console.log('load')
                                            loadUserInfo(user.infos, user.subuser, index)
                                            loadProgress(resultstate.result[0].state,resultobj.result[0].obj)
                                            navigation.reset({
                                              index: 0,
                                              routes: [{ name: 'Home' }],
                                            })
                                        }
                                      )
                                }
                              )
                            }
                            }
                          
                        >
                            <Text key={index} style={styles.title}>{player.name}</Text>
                        </TouchableOpacity>)
              })}
              
              </View>
            
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
    title:{
      color:'white',
      textAlign:'left',
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
  loadUserInfo,
  loadProgress
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        cycle: store.cycle
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(ChangeAccount);