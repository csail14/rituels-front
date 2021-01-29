import React, {useState, useEffect} from 'react';
import {ImageBackground,View, StyleSheet,Button, Text, TouchableOpacity} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import background from '../assets/rituals-background.jpg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Menu = (props) =>{
    const navigation = props.navigation



        return(
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.image}>
                    <View style={styles.menu}>
                    <TouchableOpacity
                        onPress={() => {
                            props.setShowMenu(false)}}
                    >
                        <Text style={styles.text}> Retour </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{props.restart()} }
                    >
                        <Text style={styles.text}> Recommencer le cycle </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{props.randomCycle()} }
                    >
                        <Text style={styles.text}> Changer de cycle </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });}}
                    >
                        <Text style={styles.text}> Acceuil </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Logout' }],
                            });}}
                    >
                        <Text style={styles.texte}> Se deco </Text>
                    </TouchableOpacity>
                    
                    </View>
                </ImageBackground>
            </View>
            
        )


}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      //justifyContent:'space-around',
      height:wp('100%'),
      width:hp('30%'),
      paddingTop:15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    text :{
        color:'white',
        textAlign:'center',
        paddingTop:30,
        textDecorationLine:'underline',
        fontSize:25
    },
    menu:{
        flex: 1,
        display:'flex',
        flexDirection:'column',
        //justifyContent:'space-around',
        paddingBottom:10
    }
    
  });
const mapDispatchToProps = {
 
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Menu);