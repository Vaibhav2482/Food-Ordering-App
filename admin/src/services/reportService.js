import axiosClient from "../api/axiosClient";

const API_URL = "/reports";

export const getDailySalesReport = async () => {

    const response = await axiosClient.get(`${API_URL}/daily`);

    return response.data;

};

export const getWeeklySalesReport = async () => {

    const response = await axiosClient.get(`${API_URL}/weekly`);

    return response.data;

};

export const getMonthlySalesReport = async () => {

    const response = await axiosClient.get(`${API_URL}/monthly`);

    return response.data;

};

export const getCustomDateSalesReport = async (fromDate, toDate) => {

    const response = await axiosClient.get(`${API_URL}/custom`, {
        params: { fromDate, toDate }
    });

    return response.data;

};
