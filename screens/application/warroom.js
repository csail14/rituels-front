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
              <View style={{height:80}}>
                
                <TouchableOpacity onPress={()=>{
                  setShowHelp(true)
                }}><Text style={styles.text}>Comment fonctionne la warroom ?</Text></TouchableOpacity>
                <Text style={[styles.text,{textAlign:'left', textDecorationLine:'none'}]}>Legende :</Text>
              </View>

           <WeekCalendar/>
           {showHelp&&<Help setShowHelp={setShowHelp}/>}
           
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
        height: hp('80%'),
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
  loadEvent
}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        agenda : store.agenda
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Warroom);