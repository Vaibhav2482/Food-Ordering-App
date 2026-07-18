CREATE PROCEDURE dbo.sp_GetCart
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        C.CartId,
        C.CustomerId,
        C.MenuItemId,
        M.BranchId,
        M.ItemName,
        M.Price,
        C.Quantity,
        (M.Price * C.Quantity) AS TotalPrice,
        C.CreatedAt
    FROM dbo.Cart C
    INNER JOIN dbo.MenuItems M
        ON C.MenuItemId = M.MenuItemId
    WHERE C.CustomerId = @CustomerId
    ORDER BY C.CartId;
END;
GO
