import axiosClient from "../api/axiosClient";

const API_URL = "/tables";

export const getAllTables = async (branchId) => {

    const response = await axiosClient.get(API_URL, { params: { branchId } });

    return response.data;

};

export const getActiveTables = async (branchId) => {

    const response = await axiosClient.get(`${API_URL}/active`, { params: { branchId } });

    return response.data;

};

export const createTable = async (table) => {

    const response = await axiosClient.post(API_URL, table);

    return response.data;

};

export const updateTable = async (tableId, table) => {

    const response = await axiosClient.put(`${API_URL}/${tableId}`, table);

    return response.data;

};

export const deactivateTable = async (tableId) => {

    const response = await axiosClient.delete(`${API_URL}/${tableId}`);

    return response.data;

};
