import * as MenuService from "../services/MenuService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

export const getAllMenuItems = asyncHandler(async (req, res) => {

    const result = await MenuService.getAllMenuItems();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getMenuItemById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await MenuService.getMenuItemById(id);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const createMenuItem = asyncHandler(async (req, res) => {

    const result = await MenuService.createMenuItem(req.body);

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

export const updateMenuItem = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await MenuService.updateMenuItem(id, req.body);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const deleteMenuItem = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await MenuService.deleteMenuItem(id);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(
        res,
        null,
        result.message
    );

});