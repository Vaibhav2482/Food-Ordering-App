import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/categories";

export const getAllCategories = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};