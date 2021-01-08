import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';
import {saveUser,getUser} from '../../api/userApi'

const Register = (props)=> {

	const [language, setLanguage] = useState('Français');
    
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
		
		console.log(data)
		saveUser()
		
	}

    return (
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
    				placeholder="email"
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
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42e5ff',
	paddingTop: 50
  },
  title: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "white"
  },
  scrollContainer: {
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
	justifyContent: "center"
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