import sql from "../config/db.js";

export const getDashboardSummary = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetDashboardSummary");

    return result.recordset[0];

};

export const getRecentOrders = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetRecentOrders");

    return result.recordset;

};

export const getTopSellingItems = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetTopSellingItems");

    return result.recordset;

};

export const getSalesLast7Days = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetSalesLast7Days");

    return result.recordset;

};