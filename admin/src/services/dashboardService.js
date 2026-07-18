import axiosClient from "../api/axiosClient";

const API_URL = "/dashboard";

export const getDashboardSummary = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/summary`, { params: { branchId } });

    return response.data;

};

export const getRecentOrders = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/recent-orders`, { params: { branchId } });

    return response.data;

};

export const getTopSellingItems = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/top-selling-items`, { params: { branchId } });

    return response.data;

};

export const getSalesLast7Days = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/sales-last-7-days`, { params: { branchId } });

    return response.data;

};
