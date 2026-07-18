CREATE   PROCEDURE dbo.sp_GetSalesLast7Days
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH Last7Days AS (
        SELECT CAST(DATEADD(DAY, -Number, CAST(GETDATE() AS DATE)) AS DATE) AS SalesDate
        FROM (VALUES (0),(1),(2),(3),(4),(5),(6)) AS Numbers(Number)
    )
    SELECT
        D.SalesDate,
        ISNULL(COUNT(O.OrderId), 0) AS TotalOrders,
        ISNULL(SUM(O.TotalAmount), 0) AS TotalRevenue
    FROM Last7Days D
    LEFT JOIN dbo.Orders O
        ON CAST(O.OrderDate AS DATE) = D.SalesDate
        AND O.OrderStatus <> 'Cancelled'
        AND (@BranchId IS NULL OR O.BranchId = @BranchId)
    GROUP BY D.SalesDate
    ORDER BY D.SalesDate ASC;
END;
GO
