import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import studentReducer from "./studentReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
    errors: errorReducer,
    student: studentReducer,
    course: courseReducer
});