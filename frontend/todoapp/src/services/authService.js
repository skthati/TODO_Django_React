import axios from 'axios'

const API_URL = 'http://localhost:8000/api/';

export const register = (username, email, password) => {
    return axios.post(`${API_URL}register/`, { username, email, password });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}login/`, {username, password})
        .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const refreshToken = () => {
    const user = getCurrentUser();
    if (user && user.refresh) {
        return axios.post(`${API_URL}token/refresh/`, {refresh: user.refresh })
            .then(response => {
                localStorage.setItem('user', JSON.stringify({...user, ...response.data}))
                return response.data;
            });
    }
    return Promise.reject('No refresh token available');
};

