CREATE PROCEDURE dbo.sp_UpdateOrderStatus
(
    @OrderId INT,
    @OrderStatus NVARCHAR(50)
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CurrentStatus NVARCHAR(50);
    DECLARE @DeliveryType NVARCHAR(20);

    SELECT
        @CurrentStatus = OrderStatus,
        @DeliveryType = DeliveryType
    FROM dbo.Orders
    WHERE OrderId = @OrderId;

    IF @CurrentStatus IS NULL
    BEGIN
        RAISERROR('Order not found.',16,1);
        RETURN;
    END

    IF @CurrentStatus IN ('Delivered', 'Cancelled')
    BEGIN
        RAISERROR('This order is already finished and cannot be updated.',16,1);
        RETURN;
    END

    DECLARE @Sequence TABLE (StatusName NVARCHAR(50) PRIMARY KEY, StepOrder INT);

    IF @DeliveryType = 'Delivery'
    BEGIN
        INSERT INTO @Sequence (StatusName, StepOrder)
        VALUES
            ('Pending', 1),
            ('Accepted', 2),
            ('Preparing', 3),
            ('Ready', 4),
            ('Out For Delivery', 5),
            ('Delivered', 6);
    END
    ELSE
    BEGIN
        INSERT INTO @Sequence (StatusName, StepOrder)
        VALUES
            ('Pending', 1),
            ('Accepted', 2),
            ('Preparing', 3),
            ('Ready', 4),
            ('Delivered', 5);
    END

    DECLARE @CurrentStep INT;
    DECLARE @TargetStep INT;

    SELECT @CurrentStep = StepOrder FROM @Sequence WHERE StatusName = @CurrentStatus;
    SELECT @TargetStep = StepOrder FROM @Sequence WHERE StatusName = @OrderStatus;

    IF @TargetStep IS NULL
    BEGIN
        RAISERROR('That status is not valid for this order type.',16,1);
        RETURN;
    END

    IF @TargetStep <= @CurrentStep
    BEGIN
        RAISERROR('Order status can only move forward.',16,1);
        RETURN;
    END

    UPDATE dbo.Orders
    SET
        OrderStatus = @OrderStatus
    WHERE OrderId = @OrderId;

    SELECT *
    FROM dbo.Orders
    WHERE OrderId = @OrderId;

END;
GO
