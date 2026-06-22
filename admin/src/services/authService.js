import axios from "axios";

const API_URL =
    "http://localhost:5000/api/v1/auth";

export const adminLogin = async (

    credentials

) => {

    const response =
        await axios.post(

            `${API_URL}/admin/login`,

            credentials

        );

    return response.data;

};