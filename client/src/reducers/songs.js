import {
    FETCH_ALL,
    CREATE,
    CREATE_MULTIPLE,
    UPDATE,
    DELETE,
    DELETE_MULTIPLE,
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS,
    FETCH_ALL_FAILURE,
    SET_SONGS
} from '../constants/actionTypes';

const initialState = {
    songs: [],
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SONGS:
            return {...state, songs: action.payload};

        case FETCH_ALL:
            return {...state, songs: action.payload};
        case FETCH_ALL_REQUEST:
            return {...state, loading: true};
        case FETCH_ALL_SUCCESS:
            return {songs: action.payload, loading: false};
        case FETCH_ALL_FAILURE:
            return {...state, loading: false};

        case CREATE:
            return {...state, songs: [...state.songs, action.payload]};
        case CREATE_MULTIPLE:
            return {...state, songs: [...state.songs, ...action.payload]};
        case UPDATE:
            return {
                ...state,
                songs: state.songs.map((song) =>
                    song._id === action.payload._id ? action.payload : song
                ),
            };
        case DELETE:
            return {
                ...state,
                songs: state.songs.filter((song) => song._id !== action.payload),
            };
        case DELETE_MULTIPLE:
            return {
                ...state,
                songs: state.songs.filter((song) => !action.payload.includes(song._id)),
            };
        default:
            return state;
    }
};