import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
});

axiosClient.interceptors.request.use((config) => {

    let admin = null;

    try {
        admin = JSON.parse(localStorage.getItem("admin"));
    } catch {
        localStorage.removeItem("admin");
    }

    if (admin?.token) {
        config.headers.Authorization = `Bearer ${admin.token}`;
    }

    return config;

});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("admin");
            window.location.href = "/login";
        }

        return Promise.reject(error);

    }
);

export default axiosClient;
