import axiosClient from "../api/axiosClient";

const API_URL = "/categories";

export const getAllCategories = async () => {

    const response = await axiosClient.get(API_URL);

    return response.data;

};
