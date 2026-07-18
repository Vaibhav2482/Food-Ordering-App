import jwt from "jsonwebtoken";
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


export const getOrCreateGuestCustomer = asyncHandler(async (req, res) => {

    const result = await CustomerService.getOrCreateGuestCustomer();

    return successResponse(
        res,
        result.data,
        result.message,
        200
    );

});


export const findOrCreateWalkInCustomer = asyncHandler(async (req, res) => {

    const result = await CustomerService.findOrCreateWalkInCustomer(req.body);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message,
        200
    );

});


export const customerLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const result = await CustomerService.customerLogin(email, password);

    if (!result.success) {
        return errorResponse(res, result.message, 401);
    }

    const token = jwt.sign(
        { id: result.data.CustomerId, role: "customer", email: result.data.Email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return successResponse(
        res,
        { ...result.data, token },
        result.message
    );

});

export const getCustomerById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (req.user.role !== "admin" && String(req.user.id) !== String(id)) {
        return errorResponse(res, "You are not authorized to view this customer.", 403);
    }

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

    if (req.user.role !== "admin" && String(req.user.id) !== String(id)) {
        return errorResponse(res, "You are not authorized to update this customer.", 403);
    }

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


export const getAllCustomers = asyncHandler(async (req, res) => {

    const result =
        await CustomerService.getAllCustomers();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const deleteCustomer = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result =
        await CustomerService.deleteCustomer(id);

    if (!result.success) {

        return errorResponse(
            res,
            result.message,
            404
        );

    }

    return successResponse(
        res,
        null,
        result.message
    );

});