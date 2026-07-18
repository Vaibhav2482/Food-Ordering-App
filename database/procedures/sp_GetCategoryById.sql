CREATE PROCEDURE dbo.sp_GetCategoryById
(
    @CategoryId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CategoryId,
        CategoryName,
        Description,
        ImageUrl,
        DisplayOrder,
        IsActive
    FROM dbo.Categories
    WHERE CategoryId = @CategoryId;
END;
GO
