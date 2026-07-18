CREATE   PROCEDURE dbo.sp_GetPaymentByOrderId
(
    @OrderId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        PaymentId,
        OrderId,
        PaymentMethod,
        Amount,
        PaymentStatus,
        TransactionId,
        PaymentDate
    FROM dbo.Payments
    WHERE OrderId = @OrderId;
END;
GO
