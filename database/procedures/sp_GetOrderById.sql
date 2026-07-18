CREATE   PROCEDURE dbo.sp_GetOrderById
(
    @OrderId INT
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
        O.SubTotal,
        O.CgstAmount,
        O.SgstAmount,
        O.TotalAmount,
        O.OrderStatus,
        O.OrderNotes,
        O.OrderDate,
        O.TableNumber,
        OI.OrderItemId,
        OI.MenuItemId,
        OI.ItemName,
        OI.Price,
        OI.Quantity,
        OI.TotalPrice
    FROM dbo.Orders O
    INNER JOIN dbo.Customers C
        ON O.CustomerId = C.CustomerId
    INNER JOIN dbo.Branches B
        ON O.BranchId = B.BranchId
    INNER JOIN dbo.OrderItems OI
        ON O.OrderId = OI.OrderId
    WHERE O.OrderId = @OrderId;
END;
GO
