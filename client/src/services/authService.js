import axiosClient from "../api/axiosClient";

const API_URL = "/customers";

export const registerCustomer = async (customer) => {

    const response = await axiosClient.post(`${API_URL}/register`, customer);

    return response.data;

};

export const loginCustomer = async (credentials) => {

    const response = await axiosClient.post(`${API_URL}/login`, credentials);

    return response.data;

};

export const sendOtp = async (phone) => {

    const response = await axiosClient.post(`${API_URL}/otp/send`, { phone });

    return response.data;

};

export const verifyOtp = async (phone, otp) => {

    const response = await axiosClient.post(`${API_URL}/otp/verify`, { phone, otp });

    return response.data;

};

export const getCustomerById = async (customerId) => {

    const response = await axiosClient.get(`${API_URL}/${customerId}`);

    return response.data;

};

export const updateCustomer = async (customerId, customer) => {

    const response = await axiosClient.put(`${API_URL}/${customerId}`, customer);

    return response.data;

};
