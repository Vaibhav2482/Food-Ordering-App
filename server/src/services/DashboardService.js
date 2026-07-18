import * as DashboardRepository from "../repositories/DashboardRepository.js";

export const getDashboardSummary = async (branchId) => {

    const dashboard = await DashboardRepository.getDashboardSummary(branchId);

    return {
        success: true,
        message: "Dashboard summary fetched successfully.",
        data: dashboard
    };

};

export const getRecentOrders = async (branchId) => {

    const recentOrders = await DashboardRepository.getRecentOrders(branchId);

    return {
        success: true,
        message: "Recent orders fetched successfully.",
        data: recentOrders
    };

};

export const getTopSellingItems = async (branchId) => {

    const topSellingItems = await DashboardRepository.getTopSellingItems(branchId);

    return {
        success: true,
        message: "Top selling items fetched successfully.",
        data: topSellingItems
    };

};

export const getSalesLast7Days = async (branchId) => {

    const sales = await DashboardRepository.getSalesLast7Days(branchId);

    return {
        success: true,
        message: "Sales report fetched successfully.",
        data: sales
    };

};
