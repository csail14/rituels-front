import {LOAD_LEVEL_INFO} from './action-type';

export const loadLevel = (allLevel, currentLevel,nextLevel)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_LEVEL_INFO,
            payload: {
                allLevel:allLevel,
                currentLevel:currentLevel,
                nextLevel:nextLevel
            }
    })
}
}

