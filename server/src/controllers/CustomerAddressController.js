import * as CustomerAddressService from "../services/CustomerAddressService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const createCustomerAddress = asyncHandler(async (req, res) => {

    const result = await CustomerAddressService.createCustomerAddress(req.body);

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