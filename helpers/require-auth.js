import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../navigation/routes';
import axios from 'axios';
import {config} from '../config';
import {connect} from 'react-redux';
import {loadUserInfo} from '../actions/user/userActions';

const RequireAuth = (props)=>{
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        console.log('declenchement componentDidMount')
        retrieveData();
    }, [])


    useEffect(()=>{
        console.log('declenchement props.user')
       
    }, [props.user])

    const retrieveData = async ()=>{
        const token = await AsyncStorage.getItem('4brntoken');
        console.log('go', token)
        try {
            

            if(token === null) {
                console.log("token nul")
                setIsLogged(false);
            } else {
                console.log('else')
                axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                .then((response)=>{
                    console.log("reponse check token",response.data);
                    if(response.data.status !== 200) {
                        console.log("mauvais token")
                         setIsLogged(false);
                    } else {
                        setIsLogged(true);
                        console.log("bon token")
                        let user = response.data.user;
                        console.log('response')
                        user.token = token;
                        props.loadUserInfo(user);
                        
                    }
                })
            }
         } catch (error) {
            console.log("error ?")
        }
    }

    return (
        <React.Fragment>
           {isLogged ? <Routes/> : <Routes />}
        </React.Fragment>
    )

}

mapDispatchToProps = {
    loadUserInfo
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);