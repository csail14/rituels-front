import axios from 'axios';
import {config} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const headers = {
    "Content-Type": "application/json",
    "Authorization": "Access-Control-Allow-Origin"
  }


  export  const getAllAwards = async (subuser_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/all/award/"+subuser_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const getAwardById = async (id, subuser_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.get(config.api_url+"/api/v1/get/award/"+id+"/"+subuser_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}



export  const getAwardByWeek = async (week, subuser_id,theme_id)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    console.log('week',week)
    return axios.get(config.api_url+"/api/v1/get/award/week/"+week+"/"+subuser_id+"/"+theme_id, {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                return err;
            })
}

export  const getStateByWeek = async (week, subuser_id, theme)=>{
    const token =  await AsyncStorage.getItem('4brntoken');
    let state = []
    for (let i=0; i<theme.length;i++){
        let item = {}
        item.id=theme[i].id
    axios.get(config.api_url+"/api/v1/success/get/count/"+subuser_id+"/"+week+"/"+theme[i].id, {headers: {'x-access-token': token}})
            .then((response)=>{
                item.state=response.data.result[0].state;;
            })
            .catch((err)=>{
                return err;
            })
            state.push(item)
        }
        console.log(state)
        return state
}

export const deleteAward = (id) => {
    return axios.delete(config.api_url+'/api/v1/delete/product/'+id, {headers: {'x-access-token': token}})
        .then((res) => {
            console.log("supprimé de la base", res.data)
            return res.data;
        })
        .catch((err) => {
            return err
        })
}


export const saveNewAward = async (datas) => {
    const token =  await AsyncStorage.getItem('4brntoken');
    return axios.post(config.api_url+'/api/v1/add/award',datas, {headers: {'x-access-token': token}})
            .then((res)=>{
                return res.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const saveAwardPict = async (file) =>{
    const token =  await AsyncStorage.getItem('4brntoken');
    console.log('file', file)
    return axios({
        method: "post",
        url: config.api_url+"/api/v1/add/award/pict",
        data: file,
        image:file,
        headers: {
            'Content-type': 'multipart/form-data',
            "x-access-token": token
        }
    })
    .then((res)=>{
        return res;
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

export const deleteImage = (name)=>{
    return axios.delete(config.api_url+"/api/v1/delete/award/pict/"+name, {headers: {'x-access-token': token}})
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}

