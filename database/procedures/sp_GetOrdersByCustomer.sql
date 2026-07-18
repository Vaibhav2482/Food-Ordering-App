CREATE   PROCEDURE dbo.sp_GetOrdersByCustomer
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        O.OrderId,
        O.BranchId,
        B.BranchName,
        O.CustomerId,
        O.AddressId,
        O.DeliveryType,
        O.PaymentMethod,
        O.TotalAmount,
        O.OrderStatus,
        O.OrderNotes,
        O.OrderDate,
        O.TableNumber
    FROM dbo.Orders O
    INNER JOIN dbo.Branches B
        ON O.BranchId = B.BranchId
    WHERE O.CustomerId = @CustomerId
    ORDER BY O.OrderDate DESC;
END;
GO
