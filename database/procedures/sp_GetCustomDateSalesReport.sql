CREATE   PROCEDURE dbo.sp_GetCustomDateSalesReport
(
    @FromDate DATE,
    @ToDate DATE
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT

        CAST(OrderDate AS DATE) AS SalesDate,

        COUNT(OrderId) AS TotalOrders,

        ISNULL(SUM(TotalAmount),0) AS TotalRevenue,

        SUM(CASE WHEN OrderStatus='Delivered' THEN 1 ELSE 0 END) AS DeliveredOrders,

        SUM(CASE WHEN OrderStatus='Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders

    FROM dbo.Orders

    WHERE CAST(OrderDate AS DATE)
          BETWEEN @FromDate AND @ToDate

    GROUP BY CAST(OrderDate AS DATE)

    ORDER BY SalesDate;

END;
GO
