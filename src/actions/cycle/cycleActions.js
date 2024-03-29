import { INTERRUPTION_MODE_IOS_DO_NOT_MIX } from 'expo-av/build/Audio';
import {LOAD_CYCLE_INFO} from './action-type';

export const loadCycleInfo = (infos, cycles, duration,cat)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_CYCLE_INFO,
            payload: {
                infos:infos,
                cycles:cycles,
                duration:duration,
                cat:cat
            }
        })
    }
}
