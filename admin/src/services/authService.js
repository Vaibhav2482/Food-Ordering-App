import axiosClient from "../api/axiosClient";

export const adminLogin = async (credentials) => {

    const response = await axiosClient.post(
        "/auth/admin/login",
        credentials
    );

    return response.data;

};
