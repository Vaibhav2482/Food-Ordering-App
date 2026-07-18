import axiosClient from "../api/axiosClient";

const API_URL = "/orders";

export const getOrdersByCustomer = async (customerId) => {

    const response = await axiosClient.get(`${API_URL}/customer/${customerId}`);

    return response.data;

};

export const getOrderById = async (orderId) => {

    const response = await axiosClient.get(`${API_URL}/${orderId}`);

    return response.data;

};

export const cancelOrder = async (orderId) => {

    const response = await axiosClient.put(`${API_URL}/${orderId}/cancel`);

    return response.data;

};
