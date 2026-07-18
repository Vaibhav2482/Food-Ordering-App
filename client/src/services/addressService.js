import axiosClient from "../api/axiosClient";

const API_URL = "/customer-addresses";

export const createAddress = async (address) => {

    const response = await axiosClient.post(API_URL, address);

    return response.data;

};

export const getAddresses = async (customerId) => {

    const response = await axiosClient.get(`${API_URL}/${customerId}`);

    return response.data;

};

export const updateAddress = async (addressId, address) => {

    const response = await axiosClient.put(`${API_URL}/${addressId}`, address);

    return response.data;

};

export const deleteAddress = async (addressId) => {

    const response = await axiosClient.delete(`${API_URL}/${addressId}`);

    return response.data;

};
