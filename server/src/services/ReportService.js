import * as ReportRepository from "../repositories/ReportRepository.js";

export const getDailySalesReport = async () => {

    const report = await ReportRepository.getDailySalesReport();

    return {

        success: true,

        message: "Daily sales report fetched successfully.",

        data: report

    };

};

export const getWeeklySalesReport = async () => {

    const report = await ReportRepository.getWeeklySalesReport();

    return {

        success: true,

        message: "Weekly sales report fetched successfully.",

        data: report

    };

};

export const getMonthlySalesReport = async () => {

    const report = await ReportRepository.getMonthlySalesReport();

    return {

        success: true,

        message: "Monthly sales report fetched successfully.",

        data: report

    };

};

export const getCustomDateSalesReport = async (

    fromDate,

    toDate

) => {

    const report = await ReportRepository.getCustomDateSalesReport(

        fromDate,

        toDate

    );

    return {

        success: true,

        message: "Custom sales report fetched successfully.",

        data: report

    };

};