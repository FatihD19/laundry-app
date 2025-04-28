import axios from 'axios';
import { getStoredToken } from '../utils/storage';


const BASE_URL = 'https://8819-182-253-183-4.ngrok-free.app/api/v1'; // Ganti dengan URL_PATH sesuai kebutuhan

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