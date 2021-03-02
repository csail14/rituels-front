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
    const [statColor,setStatColor] = useState('');
    const [logoutColor,setLogoutColor] = useState('');
    const [awardColor,setAwardColor] = useState('');
    const [warroomColor,setWarroomColor] = useState('');

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
            case 'Award':
                setAwardColor('white');
                break;
            case 'Stat':
                setStatColor('white');
                break;
            default:
                break;
        }
    }
        return(
            <View style={styles.container}>
                {props.user.subuser&&<Button
                    title="Dashboard" 
                    style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });}}
                    color={acceuilColor}
                />}
                 <Button
                    title="Statistiques" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Stat' }],
                          });}}
                    color={statColor}
                />
                <Button
                    title="Awards" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Award' }],
                          });}}
                    color={awardColor}
                />
                <Button
                    title="War Room" style={styles.button}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Warroom' }],
                          });}}
                    color={warroomColor}
                />
                
                <Button
                    title="Mon Compte"
                    style={styles.button}
                    color={logoutColor}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'ChangeAccount' }],
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
      //minHeight:120,
      flexWrap:'wrap',
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