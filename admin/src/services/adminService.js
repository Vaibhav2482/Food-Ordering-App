import axiosClient from "../api/axiosClient";

const API_URL = "/admins";

export const getAllAdmins = async () => {

    const response = await axiosClient.get(API_URL);

    return response.data;

};

export const getAdminById = async (adminId) => {

    const response = await axiosClient.get(`${API_URL}/${adminId}`);

    return response.data;

};

export const createAdmin = async (admin) => {

    const response = await axiosClient.post(API_URL, admin);

    return response.data;

};

export const updateAdmin = async (adminId, admin) => {

    const response = await axiosClient.put(`${API_URL}/${adminId}`, admin);

    return response.data;

};

export const deactivateAdmin = async (adminId) => {

    const response = await axiosClient.delete(`${API_URL}/${adminId}`);

    return response.data;

};
