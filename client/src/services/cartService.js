import axiosClient from "../api/axiosClient";

const API_URL = "/cart";

export const addToCart = async (cart) => {

    const response = await axiosClient.post(API_URL, cart);

    return response.data;

};

export const getCart = async (customerId) => {

    const response = await axiosClient.get(`${API_URL}/${customerId}`);

    return response.data;

};

export const updateCartQuantity = async (cartId, quantity) => {

    const response = await axiosClient.put(`${API_URL}/${cartId}`, { quantity });

    return response.data;

};

export const removeCartItem = async (cartId) => {

    const response = await axiosClient.delete(`${API_URL}/${cartId}`);

    return response.data;

};

export const clearCart = async (customerId) => {

    const response = await axiosClient.delete(`${API_URL}/customer/${customerId}`);

    return response.data;

};
