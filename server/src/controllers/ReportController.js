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