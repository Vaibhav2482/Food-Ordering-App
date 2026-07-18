CREATE   PROCEDURE dbo.sp_GetMenuSalesReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        OI.MenuItemId,
        OI.ItemName,

        SUM(OI.Quantity) AS TotalQuantitySold,

        SUM(OI.TotalPrice) AS TotalRevenue,

        COUNT(DISTINCT OI.OrderId) AS TotalOrders

    FROM dbo.OrderItems OI

    INNER JOIN dbo.Orders O
        ON O.OrderId = OI.OrderId

    WHERE O.OrderStatus <> 'Cancelled'

    GROUP BY
        OI.MenuItemId,
        OI.ItemName

    ORDER BY
        TotalRevenue DESC;

END;
GO
