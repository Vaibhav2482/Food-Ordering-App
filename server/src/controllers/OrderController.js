import * as OrderService from "../services/OrderService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const createOrder = asyncHandler(async (req, res) => {

    const result = await OrderService.createOrder(req.body);

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

export const getAllOrders = asyncHandler(async (req, res) => {

    const result = await OrderService.getAllOrders();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getOrderById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await OrderService.getOrderById(id);

    if (!result.success) {
        return errorResponse(
            res,
            result.message,
            404
        );
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});
export const getOrdersByCustomer = asyncHandler(async (req, res) => {

    const { customerId } = req.params;

    const result = await OrderService.getOrdersByCustomer(customerId);

    if (!result.success) {
        return errorResponse(
            res,
            result.message,
            404
        );
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const updateOrderStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { orderStatus } = req.body;

    const result = await OrderService.updateOrderStatus(
        id,
        orderStatus
    );

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
        result.message
    );

});

export const cancelOrder = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await OrderService.cancelOrder(id);

    if (!result.success) {
        return errorResponse(
            res,
            result.message,
            404
        );
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});