import * as PaymentService from "../services/PaymentService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const createPayment = asyncHandler(async (req, res) => {

    const result = await PaymentService.createPayment(req.body);

    return successResponse(
        res,
        result,
        "Payment created successfully.",
        201
    );

});

export const getPaymentByOrderId = asyncHandler(async (req, res) => {

    const { orderId } = req.params;

    const result = await PaymentService.getPaymentByOrderId(orderId);

    if (!result || result.length === 0) {
        return errorResponse(
            res,
            "Payment not found.",
            404
        );
    }

    return successResponse(
        res,
        result,
        "Payment fetched successfully."
    );

});