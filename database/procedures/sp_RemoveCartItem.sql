CREATE PROCEDURE dbo.sp_RemoveCartItem
(
    @CartId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.Cart
        WHERE CartId = @CartId
    )
    BEGIN
        RAISERROR('Cart item not found.',16,1);
        RETURN;
    END

    DELETE
    FROM dbo.Cart
    WHERE CartId = @CartId;

    SELECT
        'Cart item removed successfully.' AS Message;
END;
GO
