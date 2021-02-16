import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {LocaleConfig} from 'react-native-calendars';
import {getAllEvent} from '../api/eventApi';
import {loadEvent} from '../actions/event/eventActions';
import WeekView from 'react-native-week-view';


LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const WeekCalendar = (props)=>{

    const [currentMonth,setCurrentMonth] = useState((new Date()).getMonth()+1)
    const [selectedDate, setSelectedate] = useState()
    const [data,setData] = useState([])

    const myEvents = [
      {
        id: 1,
        description: 'Event',
        //startDate: data[0].date,
        endDate: "",
        color: 'blue',
        // ... more properties if needed,
      }
    ];

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
          
            <View style={styles.weekView}><WeekView
              height={hp('80%')}
              events={myEvents}
              selectedDate={new Date()}
              locale = {'FR'}
              formatDateHeader = {'dddd DD MMMM'}
              showTitle ={false}
              numberOfDays={7}
              onEventPress ={(event)=>console.log(event)}
              onGridClick = {(pressEvent, startHour, date) => {
                  console.log('press event', pressEvent)
                  console.log('startHour', startHour)
                  console.log('date', date)
                  
              }}
              leftToRight ={true}
              headerStyle = {{ backgroundColor: '#4286f4', color: '#fff', borderColor: '#fff' }}
              hourTextStyle =  {{color: 'grey', borderColor: '#fff' }}

            /></View> 
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
        height: hp('100%'),
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
      fontSize:30
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
export default  connect(mapStateToProps, mapDispatchToProps)(WeekCalendar);