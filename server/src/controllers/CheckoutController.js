import * as CheckoutService from "../services/CheckoutService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const checkout = asyncHandler(async (req, res) => {

    const result = await CheckoutService.checkout(req.body);

    if (!result.success) {
        return errorResponse(
            res,
            result.message,
            400
        );
    }

    return successResponse(
        res,
        result.data,
        result.message,
        201
    );

});