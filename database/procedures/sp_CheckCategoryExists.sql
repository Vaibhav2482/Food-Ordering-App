CREATE   PROCEDURE dbo.sp_CheckCategoryExists
(
    @CategoryName NVARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CategoryId
    FROM dbo.Categories
    WHERE CategoryName = @CategoryName
      AND IsActive = 1;
END;
GO
