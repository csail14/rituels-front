import {combineReducers} from 'redux';
import userReducer from './userReducer';
import cycleReducer from './cycleReducer';


const rootReducer = combineReducers({
	user: userReducer,
	cycle: cycleReducer
	
});

export default rootReducer;