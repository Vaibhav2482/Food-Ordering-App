import axiosClient from "../api/axiosClient";

const API_URL = "/menu";

export const getAllMenu = async (branchId) => {

    const response = await axiosClient.get(API_URL, { params: { branchId } });

    return response.data;

};

export const createMenu = async (menuItem) => {

    const response = await axiosClient.post(
        API_URL,
        menuItem
    );

    return response.data;

};

export const updateMenu = async (menuItemId, menuItem) => {

    const response = await axiosClient.put(
        `${API_URL}/${menuItemId}`,
        menuItem
    );

    return response.data;

};
