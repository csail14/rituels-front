import axios from 'axios';
import {config} from '../config';

let data = {
    "fisrtName":"Cyril",
    "lastName":"Chesnel",
    "email":"cs@gmail.com",
    "password":"test",
    "phone":"00"

}

const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }
export const saveUser = ()=>{
    console.log("saveuser")
    return axios.get(config.api_url+"/api/v1/user/add", data, {headers})
            .then((response)=>{
                console.log(response)
                return response.data;
            })
            .catch((err)=>{
                console.log(err)
                return err;
            })
}

export const getUser = ()=>{
    console.log("getuser")
    return axios.get(config.api_url+"/api/v1/user/all")
            .then((response)=>{
                console.log(response)
                return response.data;
            })
            .catch((err)=>{
                console.log(err)
                return err;
            })
}

export const loginUser = (data)=>{
    return axios.post(config.api_url+"/api/v1/user/login", data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}
