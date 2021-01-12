import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Routes from '../navigation/routes';
import RoutesLog from '../navigation/routes-log';
import axios from 'axios';
import {config} from '../config';
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userActions';

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
        const token = await AsyncStorage.getItem('babyPubKey');
        console.log('go', token)
        try {
            

            if(token === null) {
                setIsLogged(false);
            } else {
                axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                .then((response)=>{
                    console.log(response.data);
                    if(response.data.status !== 200) {
                        
                         setIsLogged(false);
                    } else {
                        setIsLogged(true);
                        let user = response.data.user[0];
                        user.token = token;
                        props.connectUser(user);
                        
                    }
                })
            }
         } catch (error) {

        }
    }

    return (
        <React.Fragment>
           {isLogged ? <RoutesLog/> : <Routes />}
        </React.Fragment>
    )

}

mapDispatchToProps = {
    connectUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);