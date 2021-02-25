import {combineReducers} from 'redux';
import userReducer from './userReducer';
import cycleReducer from './cycleReducer';
import ProgressReducer from './progressReducer';
import eventReducer from './eventReducer';
import LevelReducer from './levelReducer'


const rootReducer = combineReducers({
	user: userReducer,
	cycle: cycleReducer,
	agenda: eventReducer,
	progress: ProgressReducer,
	level:LevelReducer
	
});

export default rootReducer;