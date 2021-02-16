import {LOAD_PROGRESS_INFO} from '../actions/progress/action-type';

const initialState = {
    state:0,
    obj:0
}

const ProgressReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_PROGRESS_INFO:
            return {state: action.payload.state, obj:action.payload.obj}    
        break;
     
    }
    return state;
}

export default ProgressReducer;