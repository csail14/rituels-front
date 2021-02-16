import React, { useState, useEffect } from 'react';
import {ImageBackground, Alert, StyleSheet, Text, View, TextInput, Dimensions,Button, Image,ScrollView, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import CalendarPicker from 'react-native-calendar-picker';
import background from '../../assets/rituals-background.jpg'
import Header from '../../navigation/header-log'
import {connect} from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import {saveNewAward,getAwardByWeek, getStateByWeek} from '../../api/awardApi'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {validateInputField} from '../../helpers/form-validator';
import {getCount} from '../../api/eventApi'
import LevelBar from '../../component/levelbar'
import PopUpHelp from '../../component/popUpHelpAward'
import { HelperText } from 'react-native-paper';


const Awards = ({ navigation,user, progress })=>{

  const [date,setdate]=useState(new Date())
  const [title, setTitle] =useState('')
  const [message,setMessage] = useState('')
  const [award, setAward] = useState('')
  const [obj, setObj] = useState(0)
  const [state, setState] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [showCalendar,setshowCalendar] = useState(false)
  const [showHelp,setShowHelp] = useState(false)

  useEffect(
    () => {
      let index= user.current_subuser
      getAwardByWeek(moment(new Date()).format('W'), user.subuser[index].id).then(
        (res)=> {
          setAward(res[0])}
      )
      setObj(progress.obj)
      setState(progress.state)
     }
    ,
    [],
    );


  const onSubmitForm = ()=> {
    let index= user.current_subuser
    let form = {
      user_id:user.infos.id,
      subuser_id:user.subuser[index].id,
      week:date,
      title:title,
      message:message,
      done:false,
      resetPrevious:false
    }
    console.log(form)
    setErrorMessage("");
    let error = formValidator();
    if (error===""){
      saveNewAward(form).then((res)=> {
        if (res.status===500){
          Alert.alert(
            "Attention",
            "Un award a déjà été programmé pour cette semaine. Voulez-vous le remplacer ?",
            [
              {
                text: "Non",
                onPress: () => {ClearForm()},
                style: "cancel"
              },
              { text: "Oui", onPress: () => {
                form.resetPrevious=true
                saveNewAward(form)
                ClearForm()
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              } }
            ],
            { cancelable: false }
          );
          
        }
        else if( res.status===200){
          ClearForm()
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
        else if(!res.status===200){
          setErrorMessage('Une erreur est survenue, veuillez réessayer plus tard.')
      }
      
      })
    }
   
  }

  const ClearForm = ()=> {
    setTitle('')
    setMessage('');
  }

  const formValidator= ()=>{
		let error=false;
		error = validateInputField('title', "string", title)
			if (error !== ""){
				setErrorMessage("Veuillez ajouter un nom")
				return error
			}
		return ""
	}

    return (
      <KeyboardAwareScrollView  style={styles.container}>
        <View style={styles.container}>
          <Header screen='Awards' navigation={navigation}/>
        
            <ImageBackground source={background} style={styles.image}>
            <ScrollView style={styles.scrollContainer}>
                <Text  style={styles.title}>Voila ta récompense de la semaine : </Text>
                <View style={{alignItems:'center'}}>
                  {award.title&&<Text style={styles.text}>{award.title}</Text>}
                  
                  <LevelBar style={styles.levelBar}obj={obj} state={state}/>
                  <Text style={styles.text}>Rituels réalisés : {state}/{obj}</Text>
                </View>
                <Text  style={styles.title}>Ajouter un nouvel award :</Text>

                <View style={styles.formView}>
            
                  <TextInput
                    style={styles.input}
                    type="text"
                    placeholder="Award"
                    value={title}
                    onChangeText={(text)=>{
                    setTitle(text);
                    }}
                  />
                  <TouchableOpacity
                  style={styles.input}
                  onPress={()=>setshowCalendar(true)}
                  >
                    <Text style={styles.textDate}>Semaine du {moment(date).format('dddd DD MMMM')}</Text>
                  </TouchableOpacity>
                    <TextInput
                      style={[styles.input,{height:100}]}
                      value={message}
                      type="text"
                      placeholder="Message"
                      onChangeText={(text)=>{
                        setMessage(text)
                          
                      }}
                    />
                    <TouchableOpacity onPress={(e)=>{
                        e.preventDefault()
                        setShowHelp(true)
                    }}>
                      <Text style={styles.text}>Comment remplir les awards ?</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    
                    <TouchableOpacity
                      style={styles.button}
                      onPress={(e)=>{
                        e.preventDefault();
                        onSubmitForm();
                      }}
                    >
                        <Text style={styles.buttonText}>Enregistrer</Text>
                    </TouchableOpacity>
                </View>
                {showCalendar&&<View style={styles.calendar}>
                    <CalendarPicker
                      height={hp('55%')}
                      previousTitle={'Préc'}
                      disabledDates={d => {
                        if((new Date(d)).getDay()!==1){
                          return d
                        }
                      }}
                      disabledDatesTextStyle={{color:'grey'}}
                      nextTitle={'Suiv'}
                      selectedDayColor={'blue'}
                      startFromMonday={true}
                      locale={'FR'}
                      width={wp('50%')}
                      onDateChange={(date) => {
                        setdate(date);
                        setshowCalendar(false)
                      }}
                    />
                  </View>}
                  {showHelp&&<PopUpHelp setShowHelp={setShowHelp}/>}
              </ScrollView>
            </ImageBackground>

                    
        </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    }, 
    scrollContainer: {
      flex:1,
      width: wp('100%'),
      height:hp('100%'),
      textAlign: 'center',
      },
    formView:{
      alignItems: "center",
      marginTop:hp('10%')
    },
    calendar:{
      position:'absolute',
      marginLeft:wp('25%'),
      marginTop:hp('20%'),
      backgroundColor:'#bdbdde',
      borderRadius:10,
      width:wp('50%')
    },   
    datePickerStyle: {
      width: '80%',
      marginBottom: 20,
    },
    levelBar:{
      justifyContent:'center'
    },
    textDate:{
      paddingTop:10
    },
    image: {
      flex: 1,
      resizeMode: "cover"
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
    },
    input: {
      backgroundColor: 'white',
      width: wp('60%'),
    height: 40,
    marginBottom: 15,
    paddingLeft: wp('5%')
    },
    buttonText:{

      color:'white',
      borderColor:'white',
      borderRadius:100
    },
    button: {
      backgroundColor: "grey",
      height: 40,
      borderRadius:8,
      width:'50%',
      
      marginTop:20,
      textAlign:'center',
      alignItems: "center",
      justifyContent: "center",

    },
    errorMessage:{
      color:'red',
      fontSize:20
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user,
        progress: store.progress
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Awards);