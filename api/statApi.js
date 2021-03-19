import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token =  AsyncStorage.getItem('4brntoken');


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }


export  const getstatbymonth = async (subuser_id,theme_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/success/get/"+subuser_id+"/"+theme_id+"/month", {headers: {'x-access-token': token}})
            .then((response)=>{
                
                return response.data;

            })
            .catch((err)=>{
                return err;
            })
}


export  const getstatbyweek = async (subuser_id,theme_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/success/get/"+subuser_id+"/"+theme_id+"/week", {headers: {'x-access-token': token}})
            .then((response)=>{
                
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const addStat = async (data)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.post(config.api_url+"/api/v1/success/add",data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}