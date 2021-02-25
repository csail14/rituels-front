import React, { useState, useEffect } from 'react';
import {ImageBackground, StyleSheet, Text, View, TouchableOpacity,Button,TextInput} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import background from '../../assets/main-background.jpg'
import Header from '../../navigation/header-account'
import {connect} from 'react-redux';



const Account = ({ navigation,user,level })=>{

  const [subuser,setsubuser] = useState({})

  useEffect(()=>{
    if (user.subuser){
      setsubuser(user.subuser[user.current_subuser])
    }
    }, [])

  console.log(subuser)
    return (
        <View style={styles.container}>
          <Header screen='Account' navigation={navigation}/>
          
            <ImageBackground source={background} style={styles.image}>
            
              <Text style={styles.title}>{subuser.name}</Text>
              <Text style={styles.title}>Niveau actuel : {level.currentLevel.name}</Text>
              
                {level.allLevel.map((level)=>{
                  return (
                    <View style={styles.levelBox}>
                      <Text style={[styles.title]}>{level.name}</Text>
                      <View>
                        <Text style={styles.leveltext}>
                          Cycle min
                        </Text>
                        <TextInput
    				            style={styles.input}
                        type="text"
                        value={""+level.min}
                        onChangeText={(text)=>{
                        
                        }}
                      />
                      </View>
                      <View>
                        <Text style={styles.leveltext}>
                          Cycle max
                        </Text>
                        <TextInput
    				            style={styles.input}
                        type="text"
                        value={""+level.max}
                        onChangeText={(text)=>{
                        
                        }}
                      />
                      </View>
                    </View>)
                })}
              
              
            
            </ImageBackground>
            
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    image: {
      flex: 1,
      resizeMode: "cover",
    },
    title:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      fontSize:30
    },
    levelBox:{
      //borderColor:'white',
      //borderWidth:1,
      borderRadius:10,
      color:'grey',
      margin:10,
      padding:10,
      //paddingLeft:30,
      textAlign:'left',
      backgroundColor:'#D6CBDE',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around'
    },
    leveltext:{
      color:'grey',
      fontSize:15,
      marginLeft:20
    },
    input: {
    backgroundColor: 'white',
    borderRadius:10,
    height: 40,
    marginBottom: 15,
    marginLeft: 20,
    textAlign:'center'
    },
    text:{
      color:'white',
      textAlign:'center',
      marginTop:10,
      marginLeft:15,
      fontSize:20
    }
  });

mapDispatchToProps = {

}

mapStateToProps = (store)=>{
    return {
        user: store.user, 
        level:store.level
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Account);