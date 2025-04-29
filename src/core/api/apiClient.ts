import axios from 'axios';
import { getStoredToken } from '../utils/storage';


const BASE_URL = 'https://b0a5-182-253-183-14.ngrok-free.app/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke setiap request
apiClient.interceptors.request.use(
    async (config) => {
        const token = await getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;