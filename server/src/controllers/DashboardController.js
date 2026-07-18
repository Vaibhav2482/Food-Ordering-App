import * as DashboardService from "../services/DashboardService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse } from "../utils/ApiResponse.js";
import { resolveBranchId } from "../utils/branchScope.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {

    const result = await DashboardService.getDashboardSummary(resolveBranchId(req));

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getRecentOrders = asyncHandler(async (req, res) => {

    const result = await DashboardService.getRecentOrders(resolveBranchId(req));

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getTopSellingItems = asyncHandler(async (req, res) => {

    const result = await DashboardService.getTopSellingItems(resolveBranchId(req));

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getSalesLast7Days = asyncHandler(async (req, res) => {

    const result = await DashboardService.getSalesLast7Days(resolveBranchId(req));

    return successResponse(
        res,
        result.data,
        result.message
    );

});
