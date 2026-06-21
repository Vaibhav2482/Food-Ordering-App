import * as ReportRepository from "../repositories/ReportRepository.js";

export const getDailySalesReport = async () => {

    const report = await ReportRepository.getDailySalesReport();

    return {
        success: true,
        message: "Daily sales report fetched successfully.",
        data: report
    };

};