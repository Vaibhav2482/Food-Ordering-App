CREATE   PROCEDURE dbo.sp_GetAllOrders
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        O.OrderId,
        O.BranchId,
        B.BranchName,
        O.CustomerId,
        C.FullName AS CustomerName,
        O.AddressId,
        O.DeliveryType,
        O.PaymentMethod,
        O.TotalAmount,
        O.OrderStatus,
        O.OrderNotes,
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
