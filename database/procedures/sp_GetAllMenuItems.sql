CREATE PROCEDURE dbo.sp_GetAllMenuItems
(
    @BranchId INT
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
    FROM dbo.MenuItems AS M
    INNER JOIN dbo.Categories AS C
        ON M.CategoryId = C.CategoryId
    WHERE C.IsActive = 1
      AND M.BranchId = @BranchId
    ORDER BY
        C.DisplayOrder,
        M.ItemName;
END;
GO
