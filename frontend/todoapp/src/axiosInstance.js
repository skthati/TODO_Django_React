import axios from 'axios';
import { getCurrentUser, refreshToken, logout} from './services/authService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use(
    config => {
        const user = getCurrentUser();
        if (user && user.access) {
            config.headers['Authorization'] = `Bearer ${user.access}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const {config, response } = error;
        if (response.status === 401 && !config.__isRetryRequest) {
            config.__isRetryRequest = true;
            try {
                await refreshToken();
                return axiosInstance(config);
            } catch (refreshError) {
                logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance