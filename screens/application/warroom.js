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

    const [currentMonth,setCurrentMonth] = useState((new Date()).getMonth()+1)
    const [eventPopUp, setEventPopUp] = useState(false)
    const [selectedDate, setSelectedate] = useState()
    const [data,setData] = useState([])
    const [mode, setMode] = useState('week')
    const [weekColor, setWeekcolor] = useState('#bdbdde')
    const [monthColor, setMonthcolor] = useState('#8484a3')

    const myEvents = [
      {
        id: 1,
        description: 'Event',
        startDate: new Date(),
        endDate: new Date(),
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

    
    const checkEvent=(day, month)=>{
      let dayData = []
      data.map((event)=>{
        let newEvent = new Date(event.date)
        if(newEvent.getDate()==day && newEvent.getMonth()+1==month){
          dayData.push(event)
        }
      })
      return dayData 
    }

        return (
          <KeyboardAwareScrollView  style={styles.container}>
        <View style={styles.container}>
          <Header screen='Warroom' navigation={props.navigation}/>
            <ImageBackground source={background} style={styles.image}>
            {mode==='week'&&<WeekCalendar/>}
              {mode==='month'&&<MonthCalendar/>}
          {/* <View style={styles.boutonView}>
            <TouchableOpacity style={styles.button}
                        onPress={
                          () => {
                            setMode('week')
                            setWeekcolor('#bdbdde')
                            setMonthcolor('#8484a3')
                            }
                        }>
                          <Text  style={[styles.textbouton, {backgroundColor:monthColor}]}>Hebdo</Text>   
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}
                        onPress={
                          () => {
                            setMode('month')
                            setWeekcolor('#8484a3')
                            setMonthcolor('#bdbdde')
                            }
                        }>
                          <Text  style={[styles.textbouton, {backgroundColor:weekColor}]}>Mensuel</Text>   
              </TouchableOpacity>
              
            </View> */}
           
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
      fontSize:30
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