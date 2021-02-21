import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {ImageBackground, StyleSheet, Text, View, Dimensions, TextInput, TextComponent, TouchableOpacity,Button} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const LevelBar = (props)=>{

    const [arrayObj , setArrayObj] = useState([]);
     const [arrayState , setArrayState] = useState([]);

    useEffect(
        () => {
            let arrObj =[]
            let state = props.state<=props.obj? props.state :props.obj
            for (let i=0;i<state;i++){
                arrObj.push("")
            }
            setArrayObj(arrObj)

            let arrState =[]
            for (let i=0;i<props.obj-state;i++){
                arrState.push("")
            }
            setArrayState(arrState)
        }
        ,
        [props.obj, props.state],
        );
    
        
    const calculWidth = () => {
        if(props.obj!==0){
            return 250/props.obj-1
        }
        else {
            return 250/4-1
        }
        
    }

    return (
        <View>
        <View style={{alignItems:'center',display:'flex', flexDirection:'row',marginTop:10}}>
            <View style={styles.container}>
            {arrayObj && arrayObj.map((index)=>{
                    return <View  key={Math.random()} style={{height:30, backgroundColor:'#3ADE14', width:calculWidth(), borderColor:'grey', borderWidth:1}}></View>
                })}
                {arrayState && arrayState.map((index)=>{
                    return <View key={Math.random()} style={{height:30, backgroundColor:'#606F7C', width:calculWidth(), borderColor:'grey', borderWidth:1}}></View>
                })}
            </View>
        </View>
        </View>
    );
}



const styles = StyleSheet.create({
    
    container: {
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      borderColor:'white',
      borderWidth:2,
      borderRadius:4,
      width:250
    },
    text:{
        color:'white',
        textAlign:'center',
        marginTop:10,
        marginLeft:15,
        fontSize:20
      },
    }
    );


export default LevelBar;