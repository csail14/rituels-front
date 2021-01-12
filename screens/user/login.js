import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Dimensions    } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';
import {saveUser,getUser} from '../../api/userApi'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer from '../../navigation/footer'

const Login = (props)=> {

	let email = "";
	let password = "";

	const onSubmitForm = ()=>{
		let data = {

			email: email,
			password: password,
		}
		getUser(data)
		
	}

    return (
		<KeyboardAwareScrollView  style={styles.container}>
    	<View style={styles.container}>
			<ImageBackground source={background} style={styles.image}>
    		<ScrollView style={styles.scrollContainer}>
			
    			<Text
					style={styles.title}
				>
					Se connecter : 
				</Text>
    			
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

    			<TouchableOpacity
					style={styles.button}
					onPress={(e)=>{
						onSubmitForm()
					}}
				>
    				<Text style={styles.buttonText}>Connexion</Text>
    			</TouchableOpacity>
				<Footer navigation={props.navigation}/>
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
	paddingTop:wp('20%'),
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

export default Login;