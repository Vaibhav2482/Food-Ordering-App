CREATE PROCEDURE dbo.sp_UpdateCartQuantity
(
    @CartId INT,
    @Quantity INT
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

    UPDATE dbo.Cart
    SET Quantity = @Quantity
    WHERE CartId = @CartId;

    SELECT
        C.CartId,
        C.CustomerId,
        C.MenuItemId,
        M.ItemName,
        M.Price,
        C.Quantity,
        (M.Price * C.Quantity) AS TotalPrice
    FROM dbo.Cart C
    INNER JOIN dbo.MenuItems M
        ON C.MenuItemId = M.MenuItemId
    WHERE C.CartId = @CartId;
END;
GO
