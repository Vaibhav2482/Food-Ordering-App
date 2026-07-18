CREATE   PROCEDURE dbo.sp_GetAllCategories
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
    ORDER BY DisplayOrder;
END;
GO
