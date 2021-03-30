import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {LocaleConfig} from 'react-native-calendars';
import {getAllEvent} from '../../api/eventApi';
import {loadEvent} from '../../actions/event/eventActions';
import WeekCalendar from '../../component/weekCalendar';
import moment from 'moment';

import Help from '../../component/popUpHelpWarroom.js'
//import 'moment/locale/fr';
moment.locale('fr');


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


const Warroom = (props)=>{

    const [data,setData] = useState([])
    const [showHelp,setShowHelp] =useState(false)
 

    useEffect(
      
      () => {
        let index = props.user.current_subuser
        let newData = []
        console.log(props.agenda)
        if(props.agenda.event.length===0){
            getAllEvent(props.user.subuser[index].id).then(
                  (res)=>{
                      if(res.status===200){
                         
                          props.loadEvent(res.result)

                          setData(res.result)
                      }
                      else{
                          setErrorMessage('Une erreur est survenue, veuillez réessayer plus tard.')
                      }
                  }
              )
        }
        else{
          setData(props.agenda.event)
        }
   
       }
      ,
      [],
      );

      useEffect(
      
        () => {
          
            setData(props.agenda.event)
         }
        ,
        [props.agenda],
        );


        return (
          <KeyboardAwareScrollView  style={styles.container}>
        <View style={styles.container}>
          <Header screen='Warroom' navigation={props.navigation}/>
            <ImageBackground source={background} style={styles.image}>
              <View style={{height:hp('90%')}}>
                <View >
                  
                  <TouchableOpacity onPress={()=>{
                    setShowHelp(true)
                  }}>
                    <Text style={styles.text}>Comment fonctionne la warroom ?</Text>
                  </TouchableOpacity>
                
                  <View style={styles.boutonView}>
                    {props.theme.allTheme.map((item)=>{
                      return(<View key={item.id} style={[styles.catbutton,{backgroundColor:item.color}]}>
                              <Text  style={ {marginTop:10, color:'white'}}>{item.name}</Text>   
                              </View>)
                        })}              
                  </View>
                </View>

                <WeekCalendar/>
                {showHelp&&<Help setShowHelp={setShowHelp}/>}
                <TouchableOpacity onPress={()=>props.navigation.reset({
                index: 0,
                routes: [{ name: 'Award' }],
              })}style={styles.button}>
                  <Text style={styles.textbouton}>Valider</Text>
                </TouchableOpacity>
              </View>
          </ImageBackground>    
        </View>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'black',
      
    },
    weekView:{
      width:wp('100%'),
      backgroundColor:'white',
      height:hp('80%')
    },
    calendar: {
        borderTopWidth: 1,
        backgroundColor:'white',
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: hp('30%'),
        width:wp('100%')
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    text:{
      color:'white',
      textAlign:'center',
      textDecorationLine:'underline',
      fontSize:20,
      marginTop:10
    },
    boutonView:{
      marginTop:5,
      marginBottom:10,
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'center'
    },
    catbutton:{
      height:40,
      paddingLeft:10,
      paddingRight:10,
      //width:'10%',
      borderColor:'black',
      borderRadius:5,
      borderWidth:1
    },
    textbouton:{
      backgroundColor:'#4185F3',
      padding:10,
      color:'white',
      textAlign:'center',
      fontSize:20,
      borderColor:'white',
      borderRadius:100
    },
    button:{
      borderRadius:100
    }
  });

mapDispatchToProps = {
  loadEvent
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        agenda : store.agenda,
        theme:store.theme
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Warroom);