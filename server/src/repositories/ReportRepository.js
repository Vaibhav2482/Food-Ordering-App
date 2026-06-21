import sql from "../config/db.js";

export const getDailySalesReport = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetDailySalesReport");

    return result.recordset;

};