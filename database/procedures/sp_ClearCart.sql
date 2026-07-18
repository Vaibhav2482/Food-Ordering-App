CREATE PROCEDURE dbo.sp_ClearCart
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE
    FROM dbo.Cart
    WHERE CustomerId = @CustomerId;

    SELECT
        'Cart cleared successfully.' AS Message;
END;
GO
