CREATE   PROCEDURE dbo.sp_GetCustomerById
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CustomerId,
        FullName,
        Email,
        Phone,
        IsActive,
        CreatedAt,
        UpdatedAt
    FROM dbo.Customers
    WHERE CustomerId = @CustomerId
      AND IsActive = 1;
END;
GO
