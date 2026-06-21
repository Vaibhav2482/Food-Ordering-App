import * as DashboardRepository from "../repositories/DashboardRepository.js";

export const getDashboardSummary = async () => {

    const dashboard = await DashboardRepository.getDashboardSummary();

    return {
        success: true,
        message: "Dashboard summary fetched successfully.",
        data: dashboard
    };

};

export const getRecentOrders = async () => {

    const recentOrders = await DashboardRepository.getRecentOrders();

    return {
        success: true,
        message: "Recent orders fetched successfully.",
        data: recentOrders
    };

};

export const getTopSellingItems = async () => {

    const topSellingItems = await DashboardRepository.getTopSellingItems();

    return {
        success: true,
        message: "Top selling items fetched successfully.",
        data: topSellingItems
    };

};

export const getSalesLast7Days = async () => {

    const sales = await DashboardRepository.getSalesLast7Days();

    return {
        success: true,
        message: "Sales report fetched successfully.",
        data: sales
    };

};