CREATE PROCEDURE [dbo].[sp_GetAllCustomers]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CustomerId,
        FullName,
        Email,
        Phone,
        CreatedAt,
        UpdatedAt
    FROM dbo.Customers
    ORDER BY CustomerId DESC;

END;
GO
