import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }
export const  saveUser =  (data)=>{
    return axios.post(config.api_url+"/api/v1/user/add", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const  sendContactMessage =  (data)=>{
    return axios.post(config.api_url+"/api/v1/user/contact", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const saveSubUser = async (data)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.post(config.api_url+"/api/v1/subuser/add", data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getUser = ()=>{
    return axios.get(config.api_url+"/api/v1/user/all")
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getAllSubuser = async (user_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/subuser/get/all/"+user_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getSubUser = (id)=>{
    return axios.get(config.api_url+"/api/v1/subuser/get/all/"+id, { headers})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const loginUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/login", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log('erreur')
                return err;

            })
}

export const forgotPassword = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/forgot', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const setNotification = async (data,id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.put(config.api_url+"/api/v1/user/set/notification/"+id, data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log('erreur')
                return err;

            })
}

export const updateSubUser = async (data, id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.put(config.api_url+"/api/v1/subuser/set/"+id, data, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log('erreur')
                return err;

            })
}