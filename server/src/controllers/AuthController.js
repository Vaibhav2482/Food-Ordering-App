import * as AuthService from "../services/AuthService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse } from "../utils/ApiResponse.js";

export const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await AuthService.adminLogin(email, password);

    return successResponse(
        res,
        result.data,
        result.message
    );

});