CREATE   PROCEDURE dbo.sp_GetWeeklySalesReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT

        CAST(OrderDate AS DATE) AS SalesDate,

        COUNT(OrderId) AS TotalOrders,

        SUM(TotalAmount) AS TotalRevenue,

        SUM(CASE WHEN OrderStatus='Delivered' THEN 1 ELSE 0 END) AS DeliveredOrders,

        SUM(CASE WHEN OrderStatus='Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders

    FROM dbo.Orders

    WHERE OrderDate >= DATEADD(DAY,-6,CAST(GETDATE() AS DATE))

    GROUP BY CAST(OrderDate AS DATE)

    ORDER BY SalesDate;

END;
GO
