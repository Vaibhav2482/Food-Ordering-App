import axiosClient from "../api/axiosClient";

const API_URL = "/customers";

export const getAllCustomers = async () => {

    const response = await axiosClient.get(API_URL);

    return response.data;

};

export const findOrCreateWalkInCustomer = async (customer) => {

    const response = await axiosClient.post(`${API_URL}/walk-in`, customer);

    return response.data;

};

export const getOrCreateGuestCustomer = async () => {

    const response = await axiosClient.post(`${API_URL}/guest`);

    return response.data;

};

export const getCustomerById = async (customerId) => {

    const response = await axiosClient.get(
        `${API_URL}/${customerId}`
    );

    return response.data;

};

export const getCustomerAddresses = async (customerId) => {

    const response = await axiosClient.get(`/customer-addresses/${customerId}`);

    return response.data;

};

export const updateCustomer = async (customerId, customer) => {

    const response = await axiosClient.put(
        `${API_URL}/${customerId}`,
        customer
    );

    return response.data;

};

export const deleteCustomer = async (customerId) => {

    const response = await axiosClient.delete(
        `${API_URL}/${customerId}`
    );

    return response.data;

};
