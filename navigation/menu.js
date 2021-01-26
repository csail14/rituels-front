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
    const [acceuilColor,setAcceuilColor] = useState('');
    const [rituelsColor,setRituelsColor] = useState('');
    const [logoutColor,setLogoutColor] = useState('');

    useEffect(
        () => {
          navigationColor();
        }
        ,
        [props.screen],
      );

    const navigationColor = () => {
        switch (props.screen) {
            case 'Home':
                setAcceuilColor('white');
                break;
            case 'Logout':
                setLogoutColor('white');
                break;
            case 'Rituels':
                setRituelsColor('white');
                break;
            default:
                break;
        }
    }
        return(
            <View style={styles.container}>
                <ImageBackground source={background} style={styles.image}>
                <TouchableOpacity
                    onPress={() => {
                        props.setShowMenu(false)}}
                >
                    <Text style={styles.texte}> Retour </Text>
                </TouchableOpacity>
                 <Button
                    title="< Retour" style={styles.button}
                    onPress={() => {
                        props.setShowMenu(false)}}
                    color={acceuilColor}
                />

                <Button
                    title="Acceuil" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });}}
                    color={acceuilColor}
                />
                 <Button
                    title="Rituels" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Rituels' }],
                          });}}
                    color={rituelsColor}
                />
                
                <Button
                    title="Se déconnecter"
                    style={styles.button}
                    color={logoutColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Logout' }],
                          });}}
                />
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
    button: {
        paddingTop:10,
        color:'white',
        height:50
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