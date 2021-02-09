import {combineReducers} from 'redux';
import userReducer from './userReducer';
import cycleReducer from './cycleReducer';
import eventReducer from './eventReducer';


const rootReducer = combineReducers({
	user: userReducer,
	cycle: cycleReducer,
	agenda: eventReducer
	
});

export default rootReducer;