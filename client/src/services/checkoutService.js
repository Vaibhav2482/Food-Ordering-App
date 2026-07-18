import axiosClient from "../api/axiosClient";

export const checkout = async (checkoutData) => {

    const response = await axiosClient.post("/checkout", checkoutData);

    return response.data;

};
