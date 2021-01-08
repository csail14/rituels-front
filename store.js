import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducers, {}, composedEnhancer);

export default store;