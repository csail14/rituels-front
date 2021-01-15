import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Dimensions    } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';
import {saveUser} from '../../api/userApi'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../navigation/header';
import {validateInputField} from '../../helpers/form-validator'
import { useIsFocused  } from '@react-navigation/native';

const Register = ({navigation})=> {

	const [errorMessage, setErrorMessage] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [lang, setlang] = useState("FR");
	const [phone, setphone] = useState("");
	const [passwordConfirm, setpasswordConfirm] = useState("");
	const isFocused = useIsFocused();

	useEffect(
		
		() => {
		  if (isFocused === false) {
			  clearform();
		  }
		}
		,
		[isFocused],
	  );
	  

	const onSubmitForm = ()=>{
		setErrorMessage("");

		let data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			lang: lang,
			phone: phone
		}
		let error = formValidator(data);
		if (error===""){
			saveUser(data)
	        .then((res)=>{
				console.log(res)
				if (res.status===200){
					console.log("nouvel utilisateur enregistré")
					clearform();
					navigation.navigate('Login')
				}
				if (res.status===501){
					setErrorMessage("Cet email est déjà utilisé, veuillez vous connecter ou en choisir un autre.")
				}
				else{
					setErrorMessage("Erreur lors de l'enregistrement de l'utilisateur, veuillez réessayer ultérieurement.")
				}
                
	        })
		}
		
	}

	const formValidator= (data)=>{
		let error=false;

		for (let key in data){
			error = validateInputField(key, "string", data[key])
			if (error !== ""){
				setErrorMessage(error)
				return error
			}
		}
		if(validateInputField('mail', 'email', data.email) !== ""){
			setErrorMessage(validateInputField('mail', 'email', data.email))
			return validateInputField('email', 'email',data.email)
		}
		if(validateInputField('téléphone', 'phone', data.phone) !== ""){
			setErrorMessage(validateInputField('téléphone', 'phone', data.phone))
			return validateInputField('téléphone', 'phone',data.phone)
		}
		if(data.password !== data.passwordConfirm){
			setErrorMessage("Les deux mots de passe ne sont pas identiques.")
			return "Les deux mots de pass ne sont pas identiques."
		}
		return ""
	}

	const clearform = () => {
		setFirstName("");
		setLastName("");
		setemail("");
		setpassword("");
		setphone("");
		setpasswordConfirm("");
	}

    return (
		<KeyboardAwareScrollView  style={styles.container}>
    	<View style={styles.container}>
		<Header screen='Register' navigation={navigation}/>
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
					value={firstName}
    				onChangeText={(text)=>{
						setFirstName(text);
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
					placeholder="Nom"
					value={lastName}
    				onChangeText={(text)=>{
    					setLastName(text);
    				}}
    			/>

				<TextInput
					style={styles.input}
					value={email}
					autoCapitalize = 'none'
    				type="text"
    				placeholder="Email"
    				onChangeText={(text)=>{
    					setemail(text)
    				}}
    			/>
				<TextInput
    				style={styles.input}
					type="password"
					value={password}
					secureTextEntry={true}
    				placeholder="Mot de passe"
    				onChangeText={(text)=>{
    					setpassword(text)
    				}}
    			/>
				<TextInput
    				style={styles.input}
					type="password"
					value={passwordConfirm}
					secureTextEntry={true}
    				placeholder="Confirmation mot de passe"
    				onChangeText={(text)=>{
    					setpasswordConfirm(text)
    				}}
    			/>

				<TextInput
					style={styles.input}
					value={phone}
    				type="text"
    				placeholder="Téléphone"
    				onChangeText={(text)=>{
    					setphone(text)
    				}}
    			/>
				
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
  errorMessage: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "red"
  },
  footer: {

	position: 'absolute',
	bottom: 0,
	right: 1,
	left: 1,
	height: 50,
},
  scrollContainer: {
	flex:1,
	width: wp('100%'),
	height:wp('50%'),
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