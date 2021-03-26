import {LOAD_LEVEL_INFO} from './action-type';

export const loadLevel = (allLevel)=>{
    console.log('payload',allLevel)
    return function(dispatch) {
        dispatch({
            type: LOAD_LEVEL_INFO,
            payload: {
                allLevel:allLevel
            }
    })
}
}

