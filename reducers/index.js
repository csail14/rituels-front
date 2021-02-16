import {combineReducers} from 'redux';
import userReducer from './userReducer';
import cycleReducer from './cycleReducer';
import ProgressReducer from './progressReducer';
import eventReducer from './eventReducer';


const rootReducer = combineReducers({
	user: userReducer,
	cycle: cycleReducer,
	agenda: eventReducer,
	progress: ProgressReducer
	
});

export default rootReducer;