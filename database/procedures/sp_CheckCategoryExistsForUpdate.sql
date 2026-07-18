CREATE   PROCEDURE dbo.sp_CheckCategoryExistsForUpdate
(
    @CategoryId INT,
    @CategoryName NVARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CategoryId
    FROM dbo.Categories
    WHERE CategoryName = @CategoryName
      AND CategoryId <> @CategoryId
      AND IsActive = 1;
END;
GO
