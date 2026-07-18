CREATE   PROCEDURE dbo.sp_CreateCategory
(
    @CategoryName NVARCHAR(100),
    @Description NVARCHAR(500),
    @ImageUrl NVARCHAR(500) = NULL,
    @DisplayOrder INT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Categories
    (
        CategoryName,
        Description,
        ImageUrl,
        DisplayOrder,
        IsActive,
        CreatedAt,
        UpdatedAt
    )
    VALUES
    (
        @CategoryName,
        @Description,
        @ImageUrl,
        @DisplayOrder,
        1,
        GETDATE(),
        GETDATE()
    );

    SELECT SCOPE_IDENTITY() AS CategoryId;
END;
GO
