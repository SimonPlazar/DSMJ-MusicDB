import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_SETTINGS, FETCH_SETTINGS } from '../constants/authConstants';

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload, isAuthenticated: true };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload, isAuthenticated: false };
        case LOGOUT:
            return { ...initialState };
        case UPDATE_SETTINGS:
            return { ...state, user: { ...state.user, settings: action.payload } };
        case FETCH_SETTINGS:
            return { ...state, user: { ...state.user, settings: action.payload } };
        default:
            return state;
    }
};