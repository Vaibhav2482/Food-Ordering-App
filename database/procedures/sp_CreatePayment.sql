CREATE   PROCEDURE dbo.sp_CreatePayment
(
    @OrderId INT,
    @PaymentMethod NVARCHAR(50),
    @Amount DECIMAL(10,2),
    @PaymentStatus NVARCHAR(20) = 'Pending',
    @TransactionId NVARCHAR(150) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.Orders
        WHERE OrderId = @OrderId
    )
    BEGIN
        RAISERROR('Order not found.',16,1);
        RETURN;
    END

    INSERT INTO dbo.Payments
    (
        OrderId,
        PaymentMethod,
        Amount,
        PaymentStatus,
        TransactionId,
        PaymentDate
    )
    VALUES
    (
        @OrderId,
        @PaymentMethod,
        @Amount,
        @PaymentStatus,
        @TransactionId,
        GETDATE()
    );

    SELECT *
    FROM dbo.Payments
    WHERE PaymentId = SCOPE_IDENTITY();
END;
GO
