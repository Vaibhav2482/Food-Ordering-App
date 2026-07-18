import axiosClient from "../api/axiosClient";

const API_URL = "/menu";

export const getAllMenu = async (branchId) => {

    const response = await axiosClient.get(API_URL, { params: { branchId } });

    return response.data;

};

export const getMenuItemById = async (menuItemId) => {

    const response = await axiosClient.get(`${API_URL}/${menuItemId}`);

    return response.data;

};
