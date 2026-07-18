CREATE   PROCEDURE dbo.sp_CustomerLogin
(
    @Email NVARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CustomerId,
        FullName,
        Email,
        Phone,
        Password,
        IsActive
    FROM dbo.Customers
    WHERE Email = @Email
      AND IsActive = 1;
END;
GO
