CREATE PROCEDURE dbo.sp_GetMenuItemById
(
    @MenuItemId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        M.MenuItemId,
        M.BranchId,
        M.CategoryId,
        C.CategoryName,
        M.ItemName,
        M.Description,
        M.Price,
        M.ImageUrl,
        M.IsAvailable,
        M.IsPopular,
        M.IsActive,
        M.CreatedAt,
        M.UpdatedAt
    FROM dbo.MenuItems M
    INNER JOIN dbo.Categories C
        ON M.CategoryId = C.CategoryId
    WHERE M.MenuItemId = @MenuItemId
      AND C.IsActive = 1;
END;
GO
