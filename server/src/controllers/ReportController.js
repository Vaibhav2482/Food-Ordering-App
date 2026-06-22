import * as ReportService from "../services/ReportService.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { successResponse } from "../utils/ApiResponse.js";

export const getDailySalesReport = asyncHandler(async (req, res) => {

    const result = await ReportService.getDailySalesReport();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getWeeklySalesReport = asyncHandler(async (req, res) => {

    const result = await ReportService.getWeeklySalesReport();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getMonthlySalesReport = asyncHandler(async (req, res) => {

    const result = await ReportService.getMonthlySalesReport();

    return successResponse(
        res,
        result.data,
        result.message
    );

});

export const getCustomDateSalesReport = asyncHandler(async (req, res) => {

    const {

        fromDate,

        toDate

    } = req.query;

    const result =
        await ReportService.getCustomDateSalesReport(

            fromDate,

            toDate

        );

    return successResponse(
        res,
        result.data,
        result.message
    );

});