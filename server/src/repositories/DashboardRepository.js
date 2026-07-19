import pool from "../config/db.js";

export const getDashboardSummary = async (branchId) => {

    const result = await pool.query(
        `SELECT
            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderDate"::date = CURRENT_DATE
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "TodayOrders",

            (SELECT COALESCE(SUM("TotalAmount"), 0) FROM "Orders"
             WHERE "OrderDate"::date = CURRENT_DATE
               AND "OrderStatus" <> 'Cancelled'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "TodayRevenue",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Pending'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "PendingOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Accepted'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "AcceptedOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Preparing'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "PreparingOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Ready'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "ReadyOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Out For Delivery'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "OutForDeliveryOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Delivered'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "DeliveredOrders",

            (SELECT COUNT(*) FROM "Orders"
             WHERE "OrderStatus" = 'Cancelled'
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "CancelledOrders",

            (SELECT COUNT(*) FROM "Customers" WHERE "IsActive" = TRUE) AS "TotalCustomers",

            (SELECT COUNT(*) FROM "MenuItems"
             WHERE "IsAvailable" = TRUE
               AND ($1::int IS NULL OR "BranchId" = $1)) AS "TotalMenuItems"
        `,
        [branchId ?? null]
    );

    return result.rows[0];

};

export const getRecentOrders = async (branchId) => {

    const result = await pool.query(
        `SELECT O."OrderId", O."BranchId", B."BranchName", C."FullName" AS "CustomerName",
                O."TotalAmount", O."PaymentMethod", O."OrderStatus", O."OrderDate", O."TableNumber"
         FROM "Orders" O
         INNER JOIN "Customers" C ON O."CustomerId" = C."CustomerId"
         INNER JOIN "Branches" B ON O."BranchId" = B."BranchId"
         WHERE $1::int IS NULL OR O."BranchId" = $1
         ORDER BY O."OrderDate" DESC
         LIMIT 10`,
        [branchId ?? null]
    );

    return result.rows;

};

export const getTopSellingItems = async (branchId) => {

    const result = await pool.query(
        `SELECT OI."MenuItemId", OI."ItemName",
                SUM(OI."Quantity") AS "TotalQuantitySold",
                SUM(OI."TotalPrice") AS "TotalSales"
         FROM "OrderItems" OI
         INNER JOIN "Orders" O ON O."OrderId" = OI."OrderId"
         WHERE O."OrderStatus" <> 'Cancelled'
           AND ($1::int IS NULL OR O."BranchId" = $1)
         GROUP BY OI."MenuItemId", OI."ItemName"
         ORDER BY "TotalQuantitySold" DESC, "TotalSales" DESC
         LIMIT 10`,
        [branchId ?? null]
    );

    return result.rows;

};

export const getSalesLast7Days = async (branchId) => {

    const result = await pool.query(
        `WITH last_7_days AS (
            SELECT (CURRENT_DATE - n) AS "SalesDate"
            FROM generate_series(0, 6) AS n
        )
        SELECT
            D."SalesDate",
            COALESCE(COUNT(O."OrderId"), 0) AS "TotalOrders",
            COALESCE(SUM(O."TotalAmount"), 0) AS "TotalRevenue"
        FROM last_7_days D
        LEFT JOIN "Orders" O
            ON O."OrderDate"::date = D."SalesDate"
            AND O."OrderStatus" <> 'Cancelled'
            AND ($1::int IS NULL OR O."BranchId" = $1)
        GROUP BY D."SalesDate"
        ORDER BY D."SalesDate" ASC`,
        [branchId ?? null]
    );

    return result.rows;

};
