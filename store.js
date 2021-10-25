import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./src/reducers";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducers, {}, composedEnhancer);

export default store;
