import * as CustomerService from "../services/CustomerService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const registerCustomer = asyncHandler(async (req, res) => {

    const result = await CustomerService.registerCustomer(req.body);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message,
        201
    );

});


export const customerLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await CustomerService.customerLogin(email, password);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getCustomerById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await CustomerService.getCustomerById(id);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const updateCustomer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const result = await CustomerService.updateCustomer(id, req.body);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );
  
});
