import * as OrderRepository from "../repositories/OrderRepository.js";
import * as PaymentService from "../services/PaymentService.js";
import * as RazorpayService from "../services/RazorpayService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { branchMismatch } from "../utils/branchScope.js";

export const createPayment = asyncHandler(async (req, res) => {

    const order = await OrderRepository.getOrderById(req.body.orderId);

    if (!order || order.length === 0) {
        return errorResponse(res, "Order not found.", 404);
    }

    if (req.user.role !== "admin" && String(req.user.id) !== String(order[0].CustomerId)) {
        return errorResponse(res, "You are not authorized to pay for this order.", 403);
    }

    if (branchMismatch(req, order[0].BranchId)) {
        return errorResponse(res, "You are not authorized to pay for an order from another branch.", 403);
    }

    const result = await PaymentService.createPayment(req.body);

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

export const getPaymentByOrderId = asyncHandler(async (req, res) => {

    const { orderId } = req.params;

    const order = await OrderRepository.getOrderById(orderId);

    if (!order || order.length === 0) {
        return errorResponse(res, "Order not found.", 404);
    }

    if (req.user.role !== "admin" && String(req.user.id) !== String(order[0].CustomerId)) {
        return errorResponse(res, "You are not authorized to view this payment.", 403);
    }

    if (branchMismatch(req, order[0].BranchId)) {
        return errorResponse(res, "You are not authorized to view a payment from another branch.", 403);
    }

    const result = await PaymentService.getPaymentByOrderId(orderId);

    if (!result.data || result.data.length === 0) {
        return errorResponse(
            res,
            "Payment not found.",
            404
        );
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const createRazorpayOrder = asyncHandler(async (req, res) => {

    const { orderId } = req.body;

    const order = await OrderRepository.getOrderById(orderId);

    if (!order || order.length === 0) {
        return errorResponse(res, "Order not found.", 404);
    }

    if (req.user.role !== "admin" && String(req.user.id) !== String(order[0].CustomerId)) {
        return errorResponse(res, "You are not authorized to pay for this order.", 403);
    }

    if (branchMismatch(req, order[0].BranchId)) {
        return errorResponse(res, "You are not authorized to pay for an order from another branch.", 403);
    }

    const result = await RazorpayService.createRazorpayOrder(orderId);

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

export const verifyRazorpayPayment = asyncHandler(async (req, res) => {

    const { orderId } = req.body;

    const order = await OrderRepository.getOrderById(orderId);

    if (!order || order.length === 0) {
        return errorResponse(res, "Order not found.", 404);
    }

    if (req.user.role !== "admin" && String(req.user.id) !== String(order[0].CustomerId)) {
        return errorResponse(res, "You are not authorized to pay for this order.", 403);
    }

    if (branchMismatch(req, order[0].BranchId)) {
        return errorResponse(res, "You are not authorized to pay for an order from another branch.", 403);
    }

    const result = await RazorpayService.verifyRazorpayPayment(req.body);

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
