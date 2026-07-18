import axiosClient from "../api/axiosClient";

const API_URL = "/branches";

export const getActiveBranches = async () => {

    const response = await axiosClient.get(`${API_URL}/active`);

    return response.data;

};
