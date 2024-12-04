import {FETCH_ALL, CREATE, CREATE_MULTIPLE, UPDATE, DELETE, DELETE_MULTIPLE} from '../constants/actionTypes';

export default (songs = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            // return action.payload;
            return {songs: action.payload};
        case CREATE:
            return [...songs, action.payload]; // spread songs and add new song
        case CREATE_MULTIPLE:
            return [...songs, ...action.payload];
        case UPDATE:
            return songs.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return songs.filter((post) => post._id !== action.payload);
        case DELETE_MULTIPLE:
            return songs.filter((post) => !action.payload.includes(post._id));
        default:
            return songs;
    }
};