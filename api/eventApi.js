import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token =  AsyncStorage.getItem('4brntoken');


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }


export  const getAllEvent = async (subuser_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/event/get/all/"+subuser_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const getOneEvent = async (subuser_id,id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/event/get/"+id+"/"+subuser_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const addEvent = (data)=>{
    return axios.post(config.api_url+"/api/v1/event/add", data,  {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const modifyEvent = (data,id)=>{
    return axios.put(config.api_url+"/api/v1/event/set/"+id, data,  {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const deleteEvent = (id)=>{
    return axios.put(config.api_url+"/api/v1/event/delete/"+id,  {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}