import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,Dimensions    } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/rituals-background.jpg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HeaderLog from '../../navigation/header-log';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/user/userActions';

const Logout = (props)=> {

    useEffect(()=>{
        removeData();
		props.logoutUser();
		props.navigation.navigate('Home')
    }, [])

	const removeData = async () => {
		try {
		  await AsyncStorage.removeItem('4brntoken')
		} catch (e) {
		  console.log(e)
		}
	  }


    return (
		<KeyboardAwareScrollView  style={styles.container}>
    	<View style={styles.container}>
		<HeaderLog screen='Logout' navigation={props.navigation}/>
			<ImageBackground source={background} style={styles.image}>
    		
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
  image: {
	flex: 1,
	resizeMode: "cover",
	justifyContent: "center",
	paddingTop:wp('20%'),
	height:Dimensions.get("window").height 
  }
});
mapDispatchToProps = {
    logoutUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Logout);