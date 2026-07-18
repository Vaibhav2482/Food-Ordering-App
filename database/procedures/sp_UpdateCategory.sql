CREATE   PROCEDURE dbo.sp_UpdateCategory
(
    @CategoryId INT,
    @CategoryName NVARCHAR(100),
    @Description NVARCHAR(500),
    @ImageUrl NVARCHAR(500) = NULL,
    @DisplayOrder INT,
    @IsActive BIT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Categories
    SET
        CategoryName = @CategoryName,
        Description = @Description,
        ImageUrl = @ImageUrl,
        DisplayOrder = @DisplayOrder,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE CategoryId = @CategoryId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
