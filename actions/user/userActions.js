import {LOAD_USER_INFO, LOGOUT_USER_INFO,LOAD_SUBUSER_INFO} from './action-type';

export const loadUserInfo = (user, subuser)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_USER_INFO,
            payload: {
                infos:user,
                subuser:subuser
            }
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
