CREATE   PROCEDURE dbo.sp_UpdateCustomer
(
    @CustomerId INT,
    @FullName NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(15)
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Customers
    SET
        FullName = @FullName,
        Email = @Email,
        Phone = @Phone,
        UpdatedAt = GETDATE()
    WHERE CustomerId = @CustomerId
      AND IsActive = 1;

    SELECT
        CustomerId,
        FullName,
        Email,
        Phone,
        IsActive,
        CreatedAt,
        UpdatedAt
    FROM dbo.Customers
    WHERE CustomerId = @CustomerId;
END;
GO
