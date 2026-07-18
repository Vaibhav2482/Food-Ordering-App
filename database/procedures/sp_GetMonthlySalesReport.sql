CREATE   PROCEDURE dbo.sp_GetMonthlySalesReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT

        YEAR(OrderDate) AS SalesYear,

        MONTH(OrderDate) AS SalesMonth,

        COUNT(OrderId) AS TotalOrders,

        ISNULL(SUM(TotalAmount),0) AS TotalRevenue,

        SUM(CASE WHEN OrderStatus='Delivered' THEN 1 ELSE 0 END) AS DeliveredOrders,

        SUM(CASE WHEN OrderStatus='Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders

    FROM dbo.Orders

    GROUP BY
        YEAR(OrderDate),
        MONTH(OrderDate)

    ORDER BY
        SalesYear DESC,
        SalesMonth DESC;

END;
GO
