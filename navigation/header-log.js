import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const HeaderLog = (props) =>{
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
                <Button
                    title="Acceuil" style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                    color={acceuilColor}
                />
                 <Button
                    title="Rituels" style={styles.button}
                    onPress={() => navigation.navigate('Rituels')}
                    color={rituelsColor}
                />
                
                <Button
                    title="Se déconnecter"
                    style={styles.button}
                    color={logoutColor}
                    onPress={() => navigation.navigate('Logout')}
                />
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



export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog);