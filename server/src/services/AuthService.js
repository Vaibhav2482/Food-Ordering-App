import * as AuthRepository from "../repositories/AuthRepository.js";

export const adminLogin = async (email, password) => {

    return await AuthRepository.adminLogin(email, password);

};