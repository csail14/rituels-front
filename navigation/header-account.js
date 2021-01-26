import React, {useState, useEffect} from 'react';
import {View, StyleSheet,Button, Text} from 'react-native';
import {connect} from 'react-redux';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const HeaderAccount = (props) =>{
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
                    title={props.user.subuser[0].name} style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });}}
                    color={acceuilColor}
                />
                 <Button
                    title="Statistiques" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Stat' }],
                          });}}
                    color={rituelsColor}
                />
                
                <Button
                    title="Infos"
                    style={styles.button}
                    color={logoutColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Account' }],
                          });}}
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



export default connect(mapStateToProps, mapDispatchToProps)(HeaderAccount);