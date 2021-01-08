import {LOAD_USER_INFO, LOGOUT_USER_INFO} from './action-type';

export const loadUserInfo = (user)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_USER_INFO,
            payload: user
        })
    }
}

export const logoutUser = ()=>{
    console.log('logout');
    return function(dispatch) {
    dispatch({
        type: LOGOUT_USER_INFO,
        payload: null
    })
}
}