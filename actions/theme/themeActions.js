import {LOAD_THEME_INFO} from './action-type';

export const loadTheme = (allTheme, currentTheme)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_THEME_INFO,
            payload: {
                allTheme:allTheme,
                currentTheme:currentTheme
            }
    })
}
}

