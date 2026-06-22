import sql from "../config/db.js";

export const getDailySalesReport = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetDailySalesReport");

    return result.recordset;

};

export const getWeeklySalesReport = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetWeeklySalesReport");

    return result.recordset;

};

export const getMonthlySalesReport = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetMonthlySalesReport");

    return result.recordset;

};

export const getCustomDateSalesReport = async (

    fromDate,
    toDate

) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("FromDate", sql.Date, fromDate)
        .input("ToDate", sql.Date, toDate)
        .execute("sp_GetCustomDateSalesReport");

    return result.recordset;

};