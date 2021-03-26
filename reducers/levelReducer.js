import {LOAD_LEVEL_INFO} from '../actions/level/action-type';

const initialState = {
    allLevel:[]
}

const LevelReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_LEVEL_INFO:
            console.log('load level info')
            console.log(action.payload.allLevel)
            return {allLevel: action.payload.allLevel}    
        break;
     
    }
    return state;
}

export default LevelReducer;