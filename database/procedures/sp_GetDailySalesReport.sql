CREATE   PROCEDURE dbo.sp_GetDailySalesReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CAST(OrderDate AS DATE) AS SalesDate,

        COUNT(OrderId) AS TotalOrders,

        ISNULL(SUM(TotalAmount),0) AS TotalRevenue,

        SUM(CASE WHEN OrderStatus='Delivered' THEN 1 ELSE 0 END) AS DeliveredOrders,

        SUM(CASE WHEN OrderStatus='Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders,

        SUM(CASE WHEN PaymentMethod='Cash' THEN TotalAmount ELSE 0 END) AS CashSales,

        SUM(CASE WHEN PaymentMethod='UPI' THEN TotalAmount ELSE 0 END) AS UPISales,

        SUM(CASE WHEN PaymentMethod='Card' THEN TotalAmount ELSE 0 END) AS CardSales

    FROM dbo.Orders

    WHERE CAST(OrderDate AS DATE)=CAST(GETDATE() AS DATE)

    GROUP BY CAST(OrderDate AS DATE);

END;
GO
