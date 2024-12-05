import axios from "axios";

// const url = "https://memories-mern-stack.herokuapp.com/songs"; // deployment url
const url = "http://localhost:5000/songs";
const API = axios.create({baseURL: url});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchSongs = () => API.get(url);
export const createSong = (newSong) => API.post(url, newSong);
export const createMultipleSongs = (songs) => API.post(`${url}/songs`, songs);
export const updateSong = (id, updatedSong) => API.patch(`${url}/${id}`, updatedSong);
export const deleteSong = (id) => API.delete(`${url}/${id}`);
export const deleteMultipleSongs = (ids) => API.delete(`${url}/multiple`, {data: {ids}});

// const url = "https://memories-mern-stack.herokuapp.com/songs"; // deployment url
const url_users = "http://localhost:5000/users";
const API_users = axios.create({baseURL: url});

API_users.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const loginGoogle = (userData) => axios.post(`${url_users}/google`, userData, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const fetchUser = () => API_users.get(`${url_users}/me`);

export const getSettings = () => API_users.get(`${url_users}/settings`, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const changeSettings = (settings) => API_users.patch(`${url_users}/settings`, settings);