import {LOAD_THEME_INFO} from '../actions/theme/action-type';

const initialState = {
    allTheme:[],
    currentTheme:0
}

const ThemeReducer = (state = initialState, action)=>{
    
    switch(action.type) {
        case LOAD_THEME_INFO:
            return {allTheme: action.payload.allTheme, currentTheme:action.payload.currentTheme}    
        break;
     
    }
    return state;
}

export default ThemeReducer;