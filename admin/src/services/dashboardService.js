import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/dashboard";

export const getDashboardSummary = async () => {

    const response = await axios.get(
        `${API_URL}/summary`
    );

    return response.data;

};

export const getRecentOrders = async () => {

    const response = await axios.get(
        `${API_URL}/recent-orders`
    );

    return response.data;

};

export const getTopSellingItems = async () => {

    const response = await axios.get(
        `${API_URL}/top-selling-items`
    );

    return response.data;

};

export const getSalesLast7Days = async () => {

    const response = await axios.get(
        `${API_URL}/sales-last-7-days`
    );

    return response.data;

};