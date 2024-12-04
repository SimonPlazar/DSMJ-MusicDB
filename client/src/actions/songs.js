import * as api from '../api';
import { FETCH_ALL, CREATE, CREATE_MULTIPLE, UPDATE, DELETE, DELETE_MULTIPLE } from '../constants/actionTypes';

export const getSongs = () => async (dispatch) => {
    try {
        const {data} = await api.fetchSongs();
        // console.log('API data:',data);
        dispatch({type: FETCH_ALL, payload: data});
        return data;
    } catch (error) {
        console.log(error.message);
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