import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, TextComponent, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {validateInputField} from '../helpers/form-validator'
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import DateTimePicker from '@react-native-community/datetimepicker';
import {loadProgress} from '../actions/progress/progressActions'
import {addEvent,getCount} from '../api/eventApi'
import {getAllEvent} from '../api/eventApi';
import {loadEvent} from '../actions/event/eventActions'

const addEventComp = (props)=>{

    const [date, setDate] = useState(props.date);
    const [title, setTitle] = useState("");
    const [comment,setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [notifTime, setnotifTime] = useState(60)

    useEffect(() => {
        var d = new Date(date); d.setDate(d.getDate()-2) ;d.setHours(props.hour);
        setDate(d)
    }, [])

    const onSubmitForm = () => {
        let index= props.user.current_subuser
        let data = {
            title:title,
            comment:comment,
            date:date,
            user_id:props.user.infos.id, 
            subuser_id:props.user.subuser[index].id,
            notifTime:notifTime
        }
        setErrorMessage("");
        let error = formValidator();
        if (error===""){
            addEvent(data).then(
                (res)=>{
                    if(res.status===200){
                        props.setPopUpAvailable(false)
                        getAllEvent(props.user.subuser[index].id).then(
                            (resp)=>{
                                if(resp.status===200){
                                    props.loadEvent(resp.result)
                                }
                            }
                        )
                        getCount(props.user.subuser[index].id,moment(new Date()).format('W')).then(
                            (resultobj)=> {
                                        props.loadProgress(props.progress.state,resultobj.result[0].obj)

                            }
                          )
                    }
                    else{
                        setErrorMessage('Une erreur est survenue, veuillez réessayer plus tard.')
                    }
                }
            )
        }
    }

    const formValidator= ()=>{
		let error=false;
		error = validateInputField('title', "string", title)
			if (error !== ""){
				setErrorMessage("Veuillez ajouter un titre")
				return error
			}
		return ""
	}

    return (
        
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>props.setPopUpAvailable(false)} style={styles.close}><Text style={styles.closeText}>X</Text></TouchableOpacity>
            <Text  style={styles.title}>Nouveau rituel</Text>
            <TextInput
    			style={styles.input}
    			type="text"
				placeholder="Titre"
                onChangeText={
                    (value) =>{setTitle(value)}
                }
    		/>
            <DateTimePicker
                    style={styles.datePickerStyle}
                    value={date} 
                    mode="datetime" 
                    format="dddd  DD MMMM  HH:mm"
                    minuteInterval='15'
                    confirmBtnText="Valider"
                    locale="fr-FR"
                    cancelBtnText="Annuler"
                    customStyles={{
                        dateIcon: {
                        position: 'absolute',
                        left: 0,
                        paddingRight:5,
                        top: 4,
                        },
                        dateInput: {
                        marginLeft: '30%',
                        
                    borderRadius:10
                        },
                        marginLeft: 100
                    }}
                    onDateChange={(event, date) => {
                        setDate(date);
                    }}
            />
            
         <TextInput
    				style={styles.comment}
    				type="text"
					placeholder="Commentaire"
                    onChangeText={
                        (text) =>{setComment(text)}
                    }
    		/>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
                    <Text style={styles.text}>M'alerter </Text>
                    <TextInput
                      style={styles.inputTime}
                      value={""+notifTime}
                      onChangeText={
                          (text)=>{setnotifTime(text)}
                      }
                    />
                    <Text style={styles.text}>min avant </Text>
                  </View>
            <TouchableOpacity
					style={styles.button}
					onPress={(e)=>{
						e.preventDefault();
						onSubmitForm();
					}}
				>
    		    <Text style={styles.buttonText}>Enregistrer</Text>
    		</TouchableOpacity>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
        
    );
}



const styles = StyleSheet.create({
    
    container: {
      height:hp('80%'),
      width:wp('40%'),
      backgroundColor: '#CAE6FF',
      borderRadius:10,
      borderColor: '#CAE6FF',
      borderWidth:1,
      padding:'8%',
      marginLeft:wp('30%'),
      position:'absolute',
      display:'flex',
      alignItems: "center",
      justifyContent:'space-around'
    },
    title:{
        
        marginBottom:'20%',
        textAlign:'center',
        fontSize:30,
        color:'grey'
    },

    inputTime: {
        backgroundColor: 'white',
        width: 50,
      height: 40,
      borderRadius:5,
      marginLeft:10,
      paddingLeft:12,
      marginTop:40,
      },
      text:{
        color:'black',
        textAlign:'center',
        marginTop:50,
        marginLeft:15,
        fontSize:15
      },
    comment :{
        backgroundColor: 'white',
        borderRadius:5,
        height: 100,
        textAlign:'left',
        width:'90%',
        marginTop:20,
      paddingLeft:12
    },
    input: {
    backgroundColor: 'white',
    borderRadius:5,
      height: 40,
      width:'70%',
      marginBottom: 15,
      textAlign:'left',
      paddingLeft:12
    },
    datePickerStyle: {
        width: '80%',
        marginTop: 20,
        marginBottom: 20,
      }, 
      button: {
        backgroundColor: "grey",
        height: 40,
        borderRadius:8,
        width:'50%',
        marginTop:60,
        textAlign:'center',
        alignItems: "center",
        justifyContent: "center",

      },
      buttonText: {
          color: "white"
      },
      close: {
        position:'absolute',
        height:'10%',
        width:'10%',
        marginTop:'10%',
        right:'5%'
      },
      closeText:{
          color:'red',
          fontSize:20
      },
      errorMessage: {
        fontSize: 20,
        position:'absolute',
        textAlign: 'center',
        marginTop: '10%',
        color: "red"
      },
    }
    );

    mapDispatchToProps = {
        loadEvent,
        loadProgress
      }
      
      mapStateToProps = (store)=>{
          return {
              user: store.user,
              agenda: store.agenda,
              progress: store.progress
          }
      }
      

export default  connect(mapStateToProps, mapDispatchToProps)(addEventComp);