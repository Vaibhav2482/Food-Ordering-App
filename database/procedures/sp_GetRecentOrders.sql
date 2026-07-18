CREATE   PROCEDURE dbo.sp_GetRecentOrders
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (10)
        O.OrderId,
        O.BranchId,
        B.BranchName,
        C.FullName AS CustomerName,
        O.TotalAmount,
        O.PaymentMethod,
        O.OrderStatus,
        O.OrderDate,
        O.TableNumber
    FROM dbo.Orders O
    INNER JOIN dbo.Customers C
        ON O.CustomerId = C.CustomerId
    INNER JOIN dbo.Branches B
        ON O.BranchId = B.BranchId
    WHERE @BranchId IS NULL OR O.BranchId = @BranchId
    ORDER BY O.OrderDate DESC;
END;
GO
