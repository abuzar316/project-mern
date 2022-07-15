import { combineReducers } from "redux";

import addTodo from "./addTodo";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    addTodo,
    UserReducer
});

export default rootReducer;