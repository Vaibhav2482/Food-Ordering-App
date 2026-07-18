import axios from "axios";
import { getStoredAuth, clearStoredAuth } from "../utils/storage";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
});

axiosClient.interceptors.request.use((config) => {

    const auth = getStoredAuth();

    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;

});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            clearStoredAuth();
        }

        return Promise.reject(error);

    }
);

export default axiosClient;
