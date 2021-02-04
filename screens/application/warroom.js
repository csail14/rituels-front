import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity,Button} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import  {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';

import {LocaleConfig} from 'react-native-calendars';

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

    const now = new Date()

        return (
        <View style={styles.container}>
          <Header screen='Warroom' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            <Calendar style={styles.calendar}
              current={'2021-02-01'}
              dayComponent={({date, state}) => {
                  return (
                    <View style={{height:hp('12%')}}>
                      <TouchableOpacity onPress={()=>console.log(date)}>
                      <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                        {date.day}
                      </Text>
                      <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
                        Event
                      </Text>
                      </TouchableOpacity>
                    </View>
                  );
              }}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={()=>console.log('left arrow')}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={()=>console.log('right arrow')}
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