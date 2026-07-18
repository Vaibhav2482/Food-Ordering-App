CREATE   PROCEDURE dbo.sp_GetTopSellingItems
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (10)
        OI.MenuItemId,
        OI.ItemName,
        SUM(OI.Quantity) AS TotalQuantitySold,
        SUM(OI.TotalPrice) AS TotalSales
    FROM dbo.OrderItems OI
    INNER JOIN dbo.Orders O
        ON O.OrderId = OI.OrderId
    WHERE O.OrderStatus <> 'Cancelled'
      AND (@BranchId IS NULL OR O.BranchId = @BranchId)
    GROUP BY
        OI.MenuItemId,
        OI.ItemName
    ORDER BY
        TotalQuantitySold DESC,
        TotalSales DESC;
END;
GO
