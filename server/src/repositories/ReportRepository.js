import pool from "../config/db.js";

export const getDailySalesReport = async () => {

    const result = await pool.query(`
        SELECT
            "OrderDate"::date AS "SalesDate",
            COUNT("OrderId") AS "TotalOrders",
            COALESCE(SUM("TotalAmount"), 0) AS "TotalRevenue",
            SUM(CASE WHEN "OrderStatus" = 'Delivered' THEN 1 ELSE 0 END) AS "DeliveredOrders",
            SUM(CASE WHEN "OrderStatus" = 'Cancelled' THEN 1 ELSE 0 END) AS "CancelledOrders",
            SUM(CASE WHEN "PaymentMethod" = 'Cash' THEN "TotalAmount" ELSE 0 END) AS "CashSales",
            SUM(CASE WHEN "PaymentMethod" = 'UPI' THEN "TotalAmount" ELSE 0 END) AS "UPISales",
            SUM(CASE WHEN "PaymentMethod" = 'Card' THEN "TotalAmount" ELSE 0 END) AS "CardSales"
        FROM "Orders"
        WHERE "OrderDate"::date = CURRENT_DATE
        GROUP BY "OrderDate"::date
    `);

    return result.rows;

};

export const getWeeklySalesReport = async () => {

    const result = await pool.query(`
        SELECT
            "OrderDate"::date AS "SalesDate",
            COUNT("OrderId") AS "TotalOrders",
            SUM("TotalAmount") AS "TotalRevenue",
            SUM(CASE WHEN "OrderStatus" = 'Delivered' THEN 1 ELSE 0 END) AS "DeliveredOrders",
            SUM(CASE WHEN "OrderStatus" = 'Cancelled' THEN 1 ELSE 0 END) AS "CancelledOrders"
        FROM "Orders"
        WHERE "OrderDate" >= CURRENT_DATE - 6
        GROUP BY "OrderDate"::date
        ORDER BY "SalesDate"
    `);

    return result.rows;

};

export const getMonthlySalesReport = async () => {

    const result = await pool.query(`
        SELECT
            EXTRACT(YEAR FROM "OrderDate")::int AS "SalesYear",
            EXTRACT(MONTH FROM "OrderDate")::int AS "SalesMonth",
            COUNT("OrderId") AS "TotalOrders",
            COALESCE(SUM("TotalAmount"), 0) AS "TotalRevenue",
            SUM(CASE WHEN "OrderStatus" = 'Delivered' THEN 1 ELSE 0 END) AS "DeliveredOrders",
            SUM(CASE WHEN "OrderStatus" = 'Cancelled' THEN 1 ELSE 0 END) AS "CancelledOrders"
        FROM "Orders"
        GROUP BY EXTRACT(YEAR FROM "OrderDate"), EXTRACT(MONTH FROM "OrderDate")
        ORDER BY "SalesYear" DESC, "SalesMonth" DESC
    `);

    return result.rows;

};

export const getCustomDateSalesReport = async (fromDate, toDate) => {

    const result = await pool.query(
        `SELECT
            "OrderDate"::date AS "SalesDate",
            COUNT("OrderId") AS "TotalOrders",
            COALESCE(SUM("TotalAmount"), 0) AS "TotalRevenue",
            SUM(CASE WHEN "OrderStatus" = 'Delivered' THEN 1 ELSE 0 END) AS "DeliveredOrders",
            SUM(CASE WHEN "OrderStatus" = 'Cancelled' THEN 1 ELSE 0 END) AS "CancelledOrders"
         FROM "Orders"
         WHERE "OrderDate"::date BETWEEN $1 AND $2
         GROUP BY "OrderDate"::date
         ORDER BY "SalesDate"`,
        [fromDate, toDate]
    );

    return result.rows;

};
