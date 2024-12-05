import {combineReducers} from "redux";
import songReducer from "./songs";
import authReduceer from "./auth";

export default combineReducers({
    songs: songReducer,
    auth: authReduceer
});