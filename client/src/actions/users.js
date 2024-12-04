import * as api from '../api';

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_SETTINGS, UPDATE_SETTINGS} from '../constants/authConstants';

export const loginWithGoogle = (credential) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

    try {
        const response = await api.loginGoogle(credential);
        const {data} = response;

        if (data.success && data.token) {
            console.log('Google login successful:', data);
            localStorage.setItem('token', data.token);
            await dispatch({type: LOGIN_SUCCESS, payload: data.user});
        } else {
            throw new Error(data.message || 'Login failed');
        }
    } catch (error) {
        console.log('Error during Google login:', error);
        dispatch({type: LOGIN_FAILURE, payload: error.message || 'Unexpected error'});
    }
};

export const checkLoggedIn = () => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

    const token = localStorage.getItem('token');
    if (!token) {
        dispatch({type: LOGIN_FAILURE, payload: 'No token found'});
        return;
    }

    try {
        const response = await api.fetchUser();
        console.log('Response:', response);
        if (response.status === 200) {
            console.log('User session active:', response.data);
            dispatch({type: LOGIN_SUCCESS, payload: response.data.user});
        } else {
            throw new Error('Session expired');
        }
    } catch (error) {
        localStorage.removeItem('token');
        dispatch({type: LOGIN_FAILURE, payload: error.message || 'Authentication failed'});
    }
};

export const rehydrateAuth = () => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    const token = localStorage.getItem('token');

    if (!token) {
        console.log('No token found');

        dispatch({ type: LOGOUT });
        return;
    }

    try {
        const response = await api.fetchUser();
        // console.log('Response:', response);
        console.log('Data:', response.data);
        if (response.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.user,
            });
            console.log('User session active:', response.data);
        } else {
            throw new Error('Session expired');
        }
    } catch (error) {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT});
};

export const updateSettings = (settings) => async (dispatch) => {
    try {
        await api.changeSettings(settings);
        dispatch({type: UPDATE_SETTINGS, payload: settings});
    } catch (error) {
        console.error('Error updating settings:', error);
    }
};

export const fetchSettings = () => async (dispatch) => {
    try {
        console.log('Fetching settings...');
        const {data} = await api.getSettings();
        dispatch({type: FETCH_SETTINGS, payload: data});
        return data;
    } catch (error) {
        console.error('Error fetching settings:', error);
    }
};







