import * as MenuService from "../services/MenuService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse, errorResponse } from "../utils/ApiResponse.js";
import { resolveBranchId, isBranchAdmin, branchMismatch } from "../utils/branchScope.js";

export const getAllMenuItems = asyncHandler(async (req, res) => {

    const branchId = resolveBranchId(req);

    const result = await MenuService.getAllMenuItems(branchId);

    if (!result.success) {
        return errorResponse(res, result.message, 400);
    }

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

    const branchId = isBranchAdmin(req) ? req.user.branchId : req.body.branchId;

    const result = await MenuService.createMenuItem({ ...req.body, branchId });

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

    const existingMenuItem = await MenuService.getMenuItemById(id);

    if (!existingMenuItem.success) {
        return errorResponse(res, existingMenuItem.message, 404);
    }

    if (branchMismatch(req, existingMenuItem.data.BranchId)) {
        return errorResponse(res, "You are not authorized to update a menu item from another branch.", 403);
    }

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

    const existingMenuItem = await MenuService.getMenuItemById(id);

    if (!existingMenuItem.success) {
        return errorResponse(res, existingMenuItem.message, 404);
    }

    if (branchMismatch(req, existingMenuItem.data.BranchId)) {
        return errorResponse(res, "You are not authorized to delete a menu item from another branch.", 403);
    }

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