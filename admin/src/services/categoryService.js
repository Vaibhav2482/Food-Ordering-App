import axiosClient from "../api/axiosClient";

const API_URL = "/categories";

export const getAllCategories = async () => {

    const response = await axiosClient.get(API_URL);

    return response.data;

};

export const createCategory = async (category) => {

    const response = await axiosClient.post(
        API_URL,
        category
    );

    return response.data;

};

export const updateCategory = async (categoryId, category) => {

    const response = await axiosClient.put(
        `${API_URL}/${categoryId}`,
        category
    );

    return response.data;

};
