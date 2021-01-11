import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Dimensions    } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';
import {saveUser} from '../../api/userApi'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Register = (props)=> {

    
	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let lang = "FR";
	let phone = "";
	let passwordConfirm="";

	const onSubmitForm = ()=>{
		let data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			lang: lang,
			phone: phone
		}
		saveUser(data)
		
	}

    return (
		<KeyboardAwareScrollView  style={styles.container}>
    	<View style={styles.container}>
			<ImageBackground source={background} style={styles.image}>
    		<ScrollView style={styles.scrollContainer}>
			
    			<Text
					style={styles.title}
				>
					Créer un nouveau compte
				</Text>
    			<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Prénom"
    				onChangeText={(text)=>{
						firstName = text;
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Nom"
    				onChangeText={(text)=>{
    					lastName = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Email"
    				onChangeText={(text)=>{
    					email = text;
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Mot de passe"
    				onChangeText={(text)=>{
    					password = text;
    				}}
    			/>
								<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Confirmation mot de passe"
    				onChangeText={(text)=>{
    					passwordConfirm = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="phone"
    				onChangeText={(text)=>{
    					phone = text;
    				}}
    			/>
				

    			<TouchableOpacity
					style={styles.button}
					onPress={(e)=>{
						onSubmitForm()
					}}
				>
    				<Text style={styles.buttonText}>Enregistrer</Text>
    			</TouchableOpacity>
			
    		</ScrollView>
			</ImageBackground>
    	</View>
		</KeyboardAwareScrollView>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: 'black'
  },
  title: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "white"
  },
  scrollContainer: {
	flex:1,
	width: wp('100%'),
	textAlign: 'center',
  },
  picker:{
	backgroundColor: 'white',
	width: wp('60%'),
  	height: 40,
  	marginBottom: 15,
  	marginLeft: wp('20%'),
  	paddingLeft: wp('5%')
  },
  input: {
  	backgroundColor: 'white',
  	width: wp('60%'),
	height: 40,
	marginBottom: 15,
	marginLeft: wp('20%'),
	paddingLeft: wp('5%')
  },
  image: {
	flex: 1,
	resizeMode: "cover",
	justifyContent: "center",
	paddingTop:wp('10%'),
	height:Dimensions.get("window").height 
  },
  button: {
	backgroundColor: "#321aed",
	width: wp('40%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginLeft: wp('30%')
  },
  buttonText: {
	  color: "white"
  }
});

export default Register;