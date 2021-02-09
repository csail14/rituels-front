import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import  {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';
import AddEvent from '../../component/addEvent'

import {LocaleConfig} from 'react-native-calendars';
import {getAllEvent} from '../../api/eventApi';

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

const Warroom = ({ navigation,user })=>{



    const data = [{'date':'2021-02-17','title':'test','user_id':12,'subuser_id':34},{'date':'2021-02-01','title':'test','user_id':12,'subuser_id':34},{'date':'2021-02-21','title':'test2','user_id':12,'subuser_id':34}]
    const [currentMonth,setCurrentMonth] = useState((new Date()).getMonth()+1)
    const [eventPopUp, setEventPopUp] = useState(false)
    const [selectedDate, setSelectedate] = useState()

    
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
        <View style={styles.container}>
          <Header screen='Warroom' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            <Calendar style={styles.calendar}
              dayComponent={({date, state}) => {
                let dayData = checkEvent(date.day, date.month)
                  return (
                    <View>
                    <TouchableOpacity onPress={()=>{
                      setEventPopUp(!eventPopUp)
                      let newDate = new Date (date.year, date.month-1, date.day)
                      setSelectedate(newDate)
                    }}>
                    <View style={{height:hp('12%'), width:wp('10%')}}>
                      
                      <Text style={{textAlign: 'center', color: date.month === currentMonth ? 'black' : 'grey'}}>
                        {date.day}
                      </Text>
                      {dayData.length>0 && dayData.map((event,index)=>{
                        return (
                          <Text key={index} style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                            {event.title}
                      </Text>
                        )
                      })}
                      
                    </View>
                    </TouchableOpacity>
                    </View>
                  );
              }}
              markingType={'custom'}
              markedDates={{
                '2021-02-01': {selected: true, marked: true, selectedColor: 'blue'},
                '2021-02-06': {marked: true},
                '2021-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                '2021-02-19': {disabled: true, disableTouchEvent: true}
              }}
              onMonthChange={(month) => {setCurrentMonth(month.month)}}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={subtractMonth => subtractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              theme={{
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: 'blue',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                arrowColor: 'blue',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
            }}
          />
          {eventPopUp&&<AddEvent setPopUpAvailable={setEventPopUp} date={selectedDate}/>}
          </ImageBackground>    
        </View>
    )
}



const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'black',
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
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Warroom);