CREATE   PROCEDURE dbo.sp_GetPaymentReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        PaymentMethod,

        COUNT(PaymentId) AS TotalTransactions,

        ISNULL(SUM(Amount),0) AS TotalAmount,

        SUM(CASE WHEN PaymentStatus='Pending' THEN 1 ELSE 0 END) AS PendingPayments,

        SUM(CASE WHEN PaymentStatus='Paid' THEN 1 ELSE 0 END) AS PaidPayments,

        SUM(CASE WHEN PaymentStatus='Failed' THEN 1 ELSE 0 END) AS FailedPayments

    FROM dbo.Payments

    GROUP BY PaymentMethod

    ORDER BY PaymentMethod;

END;
GO
