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
    const [changeAccountColor,setChangeAccountColor] = useState('');
    const [accountColor,setaccountColor] = useState('');
    const [mainaccountColor,setmainaccountColor] = useState('');
    const [messageColor,setmessageColor] = useState('');

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
            case 'ChangeAccount':
                setChangeAccountColor('white');
                break;
            case 'Account':
                setaccountColor('white');
                break;
            case 'MainAccount':
                setmainaccountColor('white');
                break;
            case 'Message':
                setmessageColor('white');
                break;
            default:
                break;
        }
    }
        return(
            <View style={styles.container}>
                <Button
                    title="Dashboard"
                    style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });}}
                    color={acceuilColor}
                />

                
                <Button
                    title="Mes niveaux"
                    style={styles.button}
                    color={accountColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Account' }],
                          });}}
                />
                <Button
                    title="Changer de compte"
                    style={styles.button}
                    color={changeAccountColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ChangeAccount' }],
                          });}}
                />
                <Button
                    title="Compte parent"
                    style={styles.button}
                    color={mainaccountColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainAccount' }],
                          });}}
                />
                <Button
                    title="Message"
                    style={styles.button}
                    color={messageColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Message' }],
                          });}}
                />
                 <Button
                    title="Se déconnecter"
                    style={styles.button}
                    color={acceuilColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Logout' }],
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
      flexWrap:'wrap',
      height:wp('7%'),
      //minHeight:120,
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