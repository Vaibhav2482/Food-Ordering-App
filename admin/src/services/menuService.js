import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/menu";

export const getAllMenu = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};

export const createMenu = async (menuItem) => {

    const response = await axios.post(

        "http://localhost:5000/api/v1/menu",

        menuItem

    );

    return response.data;

};

export const updateMenu = async (menuItemId, menuItem) => {

    const response = await axios.put(

        `http://localhost:5000/api/v1/menu/${menuItemId}`,

        menuItem

    );

    return response.data;

};

export const deleteMenu = async (menuItemId) => {

    const response = await axios.delete(

        `http://localhost:5000/api/v1/menu/${menuItemId}`

    );

    return response.data;

};