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
                    <TouchableOpacity
                        onPress={() => {
                            props.setShowMenu(false)}}
                    >
                        <Text style={styles.texte}> Retour </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{props.restart()} }
                    >
                        <Text style={styles.texte}> Recommencer le cycle </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>{props.randomCycle()} }
                    >
                        <Text style={styles.texte}> Changer de cycle </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });}}
                    >
                        <Text style={styles.texte}> Acceuil </Text>
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
                </ImageBackground>
            </View>
            
        )


}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent:'space-around',
      height:wp('100%'),
      width:hp('30%'),
      paddingTop:15
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    texte :{
        color:'white'
    },

    
  });
const mapDispatchToProps = {
 
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Menu);