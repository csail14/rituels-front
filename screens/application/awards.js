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
import SelectInput from 'react-native-select-input-ios'


const Awards = ({ navigation,user, progress })=>{

  const [date,setdate]=useState(new Date())
  const [selectedValue, setSelectedValue] = useState(0)
  const [title, setTitle] =useState('')
  const [message,setMessage] = useState('')
  const [award, setAward] = useState(null)
  const [nextaward, setnextAward] = useState(null)
  const [obj, setObj] = useState(0)
  const [state, setState] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [showCalendar,setshowCalendar] = useState(false)
  const [showTitleInput, setShowTitleInput] = useState(false)

  useEffect(
    () => {
      let index= user.current_subuser
      getAwardByWeek(moment(new Date()).format('W'), user.subuser[index].id).then(
        (res)=> {
          setAward(res[0])}
      )
      let nextweek = parseInt(moment(new Date()).format('W'))+1
      console.log('next', nextweek)
      getAwardByWeek(nextweek, user.subuser[index].id).then(
        (res)=> {
          console.log(res)
          setnextAward(res[0])}
      )
      setObj(progress.obj)
      setState(progress.state)
      date.setDate(date.getDate()-date.getDay()+8)
      console.log('next award', nextaward)
     }
    ,
    [],
    );
  
     
  const options = [{
    value: 0,
    label: 'Choisis ta récompense   ▼ ',
  },
  {
    value: 1,
    label: 'Exemple 1',
  },
  {
    value: 2,
    label: 'Exemple 2 ',
  },
  {
    value: 3,
    label: 'Exemple 3',
  },
  {
    value: 4,
    label: 'Exemple 4',
  },
  {
    value: 5,
    label: 'Autre ...'
  }
  ]

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
        console.log(res.status)
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
				setErrorMessage("Veuillez ajouter un titre à votre récompense")
				return error
			}
		return ""
	}

  const selectAward = (value) => {
    let filter = options.filter(item => item.value===value)
    setSelectedValue(filter[0].value)
    if(filter[0].value!==5 && filter[0].value!==0){
      setTitle(filter[0].label)
    }
    else if (filter[0].value===5){ setTitle('') 
    setShowTitleInput(true)}
    console.log(filter)
  }


    return (
      <KeyboardAwareScrollView  style={styles.container}>
        <View style={styles.container}>
          <Header screen='Awards' navigation={navigation}/>
        
            <ImageBackground source={background} style={styles.image}>
            <ScrollView style={styles.scrollContainer}>
                
                <Text  style={styles.title}>Quelle récompense pour la semaine prochaine ?</Text>

                <View style={styles.formView}>
                <SelectInput
                  
                  value = {selectedValue}
                  style={styles.selectInput}
                  labelStyle={{color:'white', fontSize:20}}
                  cancelKeyText='Annuler'
                  submitKeyText='Valider'
                  onSubmitEditing={(value)=>{
                    selectAward(value)
                  }}
                    options={options}
                />
                
                 {showTitleInput&&<TextInput
                    style={styles.input}
                    type="text"
                    placeholder={"Award"}
                    value={title}
                    pickerViewStyle={{backgroundColor:'white'}}
                    onChangeText={(text)=>{
                    setTitle(text);
                    }}
                  />}
                
                  <TouchableOpacity
                  style={styles.input}
                  onPress={()=>setshowCalendar(true)}
                  >
                    <Text style={styles.textDate}>Semaine du {moment(date).format('dddd DD MMMM')}</Text>
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
                  {nextaward &&<View>
                    <Text  style={styles.title}>Ta récompense de la semaine prochaine: </Text>
                    <Text style={styles.text}>{nextaward.title}</Text>
                  </View>}
                  {award&&
                  <>
                  <Text  style={styles.title}>Ta récompense de la semaine : </Text>
                  <View style={{alignItems:'center'}}>
                  <Text style={styles.text}>{award.title}</Text>
                  
                  <LevelBar style={styles.levelBar}obj={obj} state={state}/>
                  <Text style={styles.text}>Rituels réalisés : {state}/{obj}</Text>
                </View>
                </>}
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
      marginTop:20
    },
    selectInput:{
      height:30, 
      paddingLeft:10,
      paddingRight:10,
      marginBottom:20,
      borderWidth:1,
      borderRadius:15,
      borderColor:'white'
    },
    calendar:{
      position:'absolute',
      marginLeft:wp('25%'),
      marginTop:hp('20%'),
      backgroundColor:'#bdbdde',
      zIndex:1,
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
      
      marginBottom:30,
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