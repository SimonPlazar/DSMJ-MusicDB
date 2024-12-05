import * as api from '../api';
import { CREATE, CREATE_MULTIPLE, UPDATE, DELETE, DELETE_MULTIPLE, FETCH_ALL_FAILURE, FETCH_ALL_REQUEST, FETCH_ALL_SUCCESS } from '../constants/actionTypes';

export const getSongs = () => async (dispatch) => {
    dispatch({type: FETCH_ALL_REQUEST});
    try {
        const {data} = await api.fetchSongs();
        // console.log('API data:',data);
        // dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: FETCH_ALL_SUCCESS, payload: data});
        return data;
    } catch (error) {
        console.log(error.message);
        dispatch({type: FETCH_ALL_FAILURE});
    }
}

export const createSong = (song) => async (dispatch) => {
    try {
        const {data} = await api.createSong(song);
        dispatch({type: CREATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const createMultipleSongs = (songs) => async (dispatch) => {
    try {
        const {data} = await api.createMultipleSongs(songs);
        dispatch({type: CREATE_MULTIPLE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateSong = (id, song) => async (dispatch) => {
    try {
        const {data} = await api.updateSong(id, song);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteSong = (id) => async (dispatch) => {
    try {
        await api.deleteSong(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMultipleSongs = (ids) => async (dispatch) => {
    try {
        await api.deleteMultipleSongs(ids);
        dispatch({type: DELETE_MULTIPLE, payload: ids});
    } catch (error) {
        console.log(error.message);
    }
}