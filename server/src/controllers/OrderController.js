import * as OrderService from "../services/OrderService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { resolveBranchId, isBranchAdmin, branchMismatch } from "../utils/branchScope.js";

export const createOrder = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin" && String(req.user.id) !== String(req.body.customerId)) {
        return errorResponse(res, "You are not authorized to place an order for another customer.", 403);
    }

    const restrictToBranchId = isBranchAdmin(req) ? req.user.branchId : undefined;

    const result = await OrderService.createOrder(req.body, restrictToBranchId);

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

export const getActiveTableOrders = asyncHandler(async (req, res) => {

    const result = await OrderService.getActiveTableOrders(resolveBranchId(req));

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getAllOrders = asyncHandler(async (req, res) => {

    const result = await OrderService.getAllOrders(resolveBranchId(req));

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

    const orderOwnerId = result.data[0]?.CustomerId;
    const orderBranchId = result.data[0]?.BranchId;

    if (req.user.role !== "admin" && String(req.user.id) !== String(orderOwnerId)) {
        return errorResponse(res, "You are not authorized to view this order.", 403);
    }

    if (branchMismatch(req, orderBranchId)) {
        return errorResponse(res, "You are not authorized to view an order from another branch.", 403);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});
export const getOrdersByCustomer = asyncHandler(async (req, res) => {

    const { customerId } = req.params;

    if (req.user.role !== "admin" && String(req.user.id) !== String(customerId)) {
        return errorResponse(res, "You are not authorized to view these orders.", 403);
    }

    const result = await OrderService.getOrdersByCustomer(customerId);

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const updateOrderStatus = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { orderStatus } = req.body;

    const existingOrder = await OrderService.getOrderById(id);

    if (!existingOrder.success) {
        return errorResponse(res, existingOrder.message, 404);
    }

    if (branchMismatch(req, existingOrder.data[0]?.BranchId)) {
        return errorResponse(res, "You are not authorized to update an order from another branch.", 403);
    }

    const result = await OrderService.updateOrderStatus(
        id,
        orderStatus
    );

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const updateOrderItems = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const existingOrder = await OrderService.getOrderById(id);

    if (!existingOrder.success) {
        return errorResponse(res, existingOrder.message, 404);
    }

    if (branchMismatch(req, existingOrder.data[0]?.BranchId)) {
        return errorResponse(res, "You are not authorized to edit an order from another branch.", 403);
    }

    const result = await OrderService.updateOrderItems(id, req.body.items);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const cancelOrder = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const existingOrder = await OrderService.getOrderById(id);

    if (!existingOrder.success) {
        return errorResponse(res, existingOrder.message, 404);
    }

    const orderOwnerId = existingOrder.data[0]?.CustomerId;

    if (req.user.role !== "admin" && String(req.user.id) !== String(orderOwnerId)) {
        return errorResponse(res, "You are not authorized to cancel this order.", 403);
    }

    if (branchMismatch(req, existingOrder.data[0]?.BranchId)) {
        return errorResponse(res, "You are not authorized to cancel an order from another branch.", 403);
    }

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
