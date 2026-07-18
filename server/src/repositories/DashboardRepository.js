import sql from "../config/db.js";

export const getDashboardSummary = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetDashboardSummary");

    return result.recordset[0];

};

export const getRecentOrders = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetRecentOrders");

    return result.recordset;

};

export const getTopSellingItems = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetTopSellingItems");

    return result.recordset;

};

export const getSalesLast7Days = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetSalesLast7Days");

    return result.recordset;

};
