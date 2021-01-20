import {LOAD_CYCLE_INFO} from './action-type';

export const loadCycleInfo = (cycle)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_CYCLE_INFO,
            payload: cycle
        })
    }
}
