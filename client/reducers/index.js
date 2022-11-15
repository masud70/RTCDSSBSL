import loggedReducer from "./login";
import { combineReducers } from 'redux';
import counterReducer from "./counter";

const allReducer = combineReducers({
    logger: loggedReducer,
    counter: counterReducer
})

export default allReducer;