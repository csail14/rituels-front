import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  const getAllLevel = async (subuser_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/all/level/"+subuser_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const saveNewLevel = async (data) => {
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.post(config.api_url+'/api/v1/level/add',data, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export  const setLevel = async (subuser_id, data)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.put(config.api_url+"/api/v1/level/set/"+subuser_id, data,{headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const deleteLevel = async (level_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.delete(config.api_url+"/api/v1/delete/level/"+level_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export const getCurrentLevel = (allLevel,count) => {
    return allLevel.filter((level)=> level.min<=count && level.max>=count)
}

export const getLevelByOrder = (allLevel,order) => {
    console.log('order',order)
    return allLevel.filter((level)=> level.ordre==order)
}