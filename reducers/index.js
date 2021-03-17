import {combineReducers} from 'redux';
import userReducer from './userReducer';
import cycleReducer from './cycleReducer';
import ProgressReducer from './progressReducer';
import eventReducer from './eventReducer';
import LevelReducer from './levelReducer';
import ThemeReducer from './themeReducer';


const rootReducer = combineReducers({
	user: userReducer,
	cycle: cycleReducer,
	agenda: eventReducer,
	progress: ProgressReducer,
	level:LevelReducer,
	theme:ThemeReducer
});

export default rootReducer;