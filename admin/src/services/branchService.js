import axiosClient from "../api/axiosClient";

const API_URL = "/branches";

export const getAllBranches = async () => {

    const response = await axiosClient.get(API_URL);

    return response.data;

};

export const getActiveBranches = async () => {

    const response = await axiosClient.get(`${API_URL}/active`);

    return response.data;

};

export const createBranch = async (branch) => {

    const response = await axiosClient.post(API_URL, branch);

    return response.data;

};

export const updateBranch = async (branchId, branch) => {

    const response = await axiosClient.put(`${API_URL}/${branchId}`, branch);

    return response.data;

};

export const deactivateBranch = async (branchId) => {

    const response = await axiosClient.delete(`${API_URL}/${branchId}`);

    return response.data;

};
