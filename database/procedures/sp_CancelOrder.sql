CREATE   PROCEDURE dbo.sp_CancelOrder
(
    @OrderId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentStatus NVARCHAR(50);

    SELECT @CurrentStatus = OrderStatus
    FROM dbo.Orders
    WHERE OrderId = @OrderId;

    IF @CurrentStatus IS NULL
    BEGIN
        RAISERROR('Order not found.',16,1);
        RETURN;
    END

    IF @CurrentStatus NOT IN ('Pending', 'Accepted', 'Preparing')
    BEGIN
        RAISERROR('Order cannot be cancelled once it is Ready, Out For Delivery, Delivered, or already Cancelled.',16,1);
        RETURN;
    END

    UPDATE dbo.Orders
    SET
        OrderStatus = 'Cancelled'
    WHERE OrderId = @OrderId;

    SELECT
        OrderId,
        CustomerId,
        AddressId,
        DeliveryType,
        PaymentMethod,
        TotalAmount,
        OrderStatus,
        OrderNotes,
        OrderDate
    FROM dbo.Orders
    WHERE OrderId = @OrderId;
END;
GO
