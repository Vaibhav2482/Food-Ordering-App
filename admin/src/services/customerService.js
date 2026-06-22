import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/customers";

export const getAllCustomers = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

export const getCustomerById = async (customerId) => {

    const response = await axios.get(

        `${API_URL}/${customerId}`

    );

    return response.data;

};

export const updateCustomer = async (customerId, customer) => {

    const response = await axios.put(

        `${API_URL}/${customerId}`,

        customer

    );

    return response.data;

};

export const deleteCustomer = async (customerId) => {

    const response = await axios.delete(

        `${API_URL}/${customerId}`

    );

    return response.data;

};