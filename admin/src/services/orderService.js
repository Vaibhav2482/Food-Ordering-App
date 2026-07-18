import axiosClient from "../api/axiosClient";

const API_URL = "/orders";

export const getAllOrders = async (branchId) => {

    const response = await axiosClient.get(API_URL, { params: { branchId } });

    return response.data;

};

export const createOrder = async (order) => {

    const response = await axiosClient.post(API_URL, order);

    return response.data;

};

export const getActiveTableOrders = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/active-by-table`, { params: { branchId } });

    return response.data;

};

export const getOrderById = async (orderId) => {

    const response = await axiosClient.get(
        `${API_URL}/${orderId}`
    );

    return response.data;

};

export const updateOrderStatus = async (orderId, orderStatus) => {

    const response = await axiosClient.put(
        `${API_URL}/${orderId}/status`,
        { orderStatus }
    );

    return response.data;

};

export const updateOrderItems = async (orderId, items) => {

    const response = await axiosClient.put(
        `${API_URL}/${orderId}/items`,
        { items }
    );

    return response.data;

};

export const cancelOrder = async (orderId) => {

    const response = await axiosClient.put(`${API_URL}/${orderId}/cancel`);

    return response.data;

};
