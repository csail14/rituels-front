import {LOAD_USER_INFO,LOGOUT_USER_INFO} from '../actions/user/action-type';

const initialState = {
    isLogged: false,
    infos: null,
    subuser:null,
    current_subuser:0
}

const UserReducer = (state = initialState, action)=>{
    console.log('userReducer', action.payload)
    switch(action.type) {
        case LOAD_USER_INFO:
            return {isLogged: true, infos: action.payload.infos, subuser:action.payload.subuser,current_subuser:action.payload.current_subuser}    
        break;
        
        case LOGOUT_USER_INFO:
            return initialState;
        break;
    }
    return state;
}

export default UserReducer;