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
        retrieveData();
    }, [])


    useEffect(()=>{
    }, [props.user])

    const retrieveData = async ()=>{
        const token = await AsyncStorage.getItem('4brntoken');
        try {
            

            if(token === null) {
                setIsLogged(false);
            } else {
                axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                .then((response)=>{
                    if(response.data.status !== 200) {
                         setIsLogged(false);
                    } else {
                        setIsLogged(true);
                        let user = response.data.user;
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