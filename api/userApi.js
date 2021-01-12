import axios from 'axios';
import {config} from '../config';


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }
export const saveUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/add", data, {headers})
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

export const loginUser = (data)=>{
    console.log('data',data)
    return axios.post(config.api_url+"/api/v1/user/login", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log('erreur')
                return err;

            })
}
