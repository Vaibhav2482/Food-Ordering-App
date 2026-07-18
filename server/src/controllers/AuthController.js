import jwt from "jsonwebtoken";
import * as AuthService from "../services/AuthService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await AuthService.adminLogin(email, password);

    if (!result.success) {
        return errorResponse(res, result.message, 401);
    }

    const token = jwt.sign(
        {
            id: result.data.AdminId,
            role: "admin",
            email: result.data.Email,
            branchId: result.data.BranchId ?? null
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return successResponse(
        res,
        { ...result.data, token },
        result.message
    );

});