CREATE   PROCEDURE dbo.sp_CreateCustomer
(
    @FullName NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone NVARCHAR(15),
    @Password NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Customers
    (
        FullName,
        Email,
        Phone,
        Password,
        IsActive,
        CreatedAt
    )
    VALUES
    (
        @FullName,
        @Email,
        @Phone,
        @Password,
        1,
        GETDATE()
    );

    SELECT *
    FROM dbo.Customers
    WHERE CustomerId = SCOPE_IDENTITY();
END;
GO
