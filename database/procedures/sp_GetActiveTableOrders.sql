CREATE PROCEDURE dbo.sp_GetActiveTableOrders
(
    @BranchId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        O.TableNumber,
        O.OrderId,
        O.OrderStatus,
        O.TotalAmount,
        O.OrderDate,
        C.FullName AS CustomerName
    FROM dbo.Orders O
    INNER JOIN dbo.Customers C
        ON O.CustomerId = C.CustomerId
    WHERE O.BranchId = @BranchId
      AND O.DeliveryType = 'Dine In'
      AND O.TableNumber IS NOT NULL
      AND O.OrderStatus NOT IN ('Delivered', 'Cancelled')
    ORDER BY O.OrderDate DESC;
END;
GO
