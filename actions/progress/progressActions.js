import {LOAD_PROGRESS_INFO} from './action-type';

export const loadProgress = (state, obj)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_PROGRESS_INFO,
            payload: {
                state:state,
                obj:obj
            }
    })
}
}

