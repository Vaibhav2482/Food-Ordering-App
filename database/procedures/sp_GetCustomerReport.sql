CREATE   PROCEDURE dbo.sp_GetCustomerReport
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        C.CustomerId,
        C.FullName,
        C.Email,
        C.Phone,

        COUNT(O.OrderId) AS TotalOrders,

        ISNULL(SUM(O.TotalAmount),0) AS TotalSpent,

        MAX(O.OrderDate) AS LastOrderDate

    FROM dbo.Customers C

    LEFT JOIN dbo.Orders O
        ON C.CustomerId = O.CustomerId

    GROUP BY
        C.CustomerId,
        C.FullName,
        C.Email,
        C.Phone

    ORDER BY TotalSpent DESC;

END;
GO
