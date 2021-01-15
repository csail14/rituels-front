import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text, TouchableOpacity} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { faCoffee } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesome  } from '@expo/vector-icons';

const Header = (props) =>{
    const navigation = props.navigation
    const [acceuilColor,setAcceuilColor] = useState('');
    const [detailColor,setDetailColor] = useState('');
    const [loginColor,setLoginColor] = useState('');
    const [registerColor,setRegisterColor] = useState('');


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
            case 'HowAppWork':
                setDetailColor('white');
                break;
            case 'Login':
                setLoginColor('white');
                break;
            case 'Register':
                setRegisterColor('white');
                break;
                        
            default:
                break;
        }
    }
        return(
            <View style={styles.container}>
                <Button
                    title="Acceuil" style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                    color={acceuilColor}
                />
                <Button
                    title="Détails"
                    style={styles.button}
                    color={detailColor}
                    onPress={() => navigation.navigate('HowAppWork')}
                ><FontAwesomeIcon style={styles.button} icon={ faCoffee } /></Button>
                <Button
                    title="S'inscrire"
                    style={styles.button}
                    color={registerColor}
                    onPress={() => navigation.navigate('Register')}
                />
                 <Button
                    title="Se connecter"
                    style={styles.button}
                    color={loginColor}
                    onPress={() => navigation.navigate('Login')}
                />
               { /*<TouchableOpacity
                    style={styles.button}
                    color={loginColor}
                    onPress={() => navigation.navigate('Login')}
                >
                <Text style={{color:loginColor}} >Se connecter</Text>
                <FontAwesomeIcon style={styles.button} icon={ faCoffee } />
               </TouchableOpacity>*/}
                
            </View>
            
        )


}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent:'space-around',
      height:wp('7%'),
      paddingTop:15
    },
    button: {
        paddingTop:10,
        color:'white',
        height:50,
        display:'flex',
        flexDirection:'column'
    },
    icon : {
        color:'white'
    }
  });
const mapDispatchToProps = {
 
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Header);