import * as CategoryService from "../services/CategoryService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";

// Get All Categories
export const getAllCategories = asyncHandler(async (req, res) => {

    const result = await CategoryService.getAllCategories();

    return successResponse(res, result.data, result.message);

});

// Get Category By Id
export const getCategoryById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await CategoryService.getCategoryById(id);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(res, result.data, result.message);

});

// Create Category
export const createCategory = asyncHandler(async (req, res) => {

    const result = await CategoryService.createCategory(req.body);

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

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await CategoryService.updateCategory(id, req.body);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const deleteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const result = await CategoryService.deleteCategory(id);

    if (!result.success) {
        return errorResponse(res, result.message, 404);
    }

    return successResponse(
        res,
        null,
        result.message
    );

});