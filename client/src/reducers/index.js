import {combineReducers} from "redux";
import posts from "./posts";
import songReducer from "./songs";
import authReduceer from "./auth";

export default combineReducers({
    songs: songReducer,
    auth: authReduceer
});