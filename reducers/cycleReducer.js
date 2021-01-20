import {LOAD_CYCLE_INFO} from '../actions/cycle/action-type';

const initialState = {
    infos: {}
}

const CycleReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_CYCLE_INFO:
            return {infos: action.payload}    
        break;
    }
    return state;
}

export default CycleReducer;