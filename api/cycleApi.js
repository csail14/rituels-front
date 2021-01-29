import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token =  AsyncStorage.getItem('4brntoken');


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }


export  const getCycle = async (cycleId)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    console.log('appel getCycle')
    return axios.get(config.api_url+"/api/v1/cycle/get/"+cycleId, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const getVideo = async (videoId)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/video/get/"+videoId, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}


