import {LOAD_LEVEL_INFO} from '../actions/level/action-type';

const initialState = {
    allLevel:[],
    currentLevel:{},
    nextLevel:{}
}

const LevelReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_LEVEL_INFO:
            return {allLevel: action.payload.allLevel, currentLevel:action.payload.currentLevel, nextLevel:action.payload.nextLevel}    
        break;
     
    }
    return state;
}

export default LevelReducer;