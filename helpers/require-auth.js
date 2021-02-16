import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from '../navigation/routes';
import axios from 'axios';
import {config} from '../config';
import {connect} from 'react-redux';
import {getCount} from '../api/eventApi'
import {loadUserInfo} from '../actions/user/userActions';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
import {loadProgress} from '../actions/progress/progressActions';
import {getStateByWeek} from '../api/awardApi'

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
                        axios.get(config.api_url+"/api/v1/subuser/get/all/"+response.data.user.id, { headers: { "x-access-token": token }})
                        .then((res=> {
                            let subuser = res.data.result
                            let user = response.data.user;
                            user.token = token;
                            props.loadUserInfo(user, subuser);
                            getCount(subuser[0].id,moment(new Date()).format('W')).then(
                                (resultobj)=> {
                                    console.log('resultobj',resultobj.result)
                                    getStateByWeek(moment(new Date()).format('W'), subuser[0].id).then(
                                        (resultstate)=> {
                                            console.log('resultState', resultstate.result)
                                            props.loadProgress(resultstate.result[0].state,resultobj.result[0].obj)
                                        }
                                      )

                                }
                              )
                              
                        }))
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
    loadUserInfo,
    loadProgress
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);