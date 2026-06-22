import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/orders";

export const getAllOrders = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

export const getOrderById = async (orderId) => {

    const response = await axios.get(

        `${API_URL}/${orderId}`

    );

    return response.data;

};

export const updateOrderStatus = async (

    orderId,

    orderStatus

) => {

    const response = await axios.put(

        `${API_URL}/${orderId}/status`,

        {

            orderStatus

        }

    );

    return response.data;

};