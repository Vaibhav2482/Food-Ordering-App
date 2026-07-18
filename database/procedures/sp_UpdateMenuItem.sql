CREATE PROCEDURE dbo.sp_UpdateMenuItem
(
    @MenuItemId INT,
    @CategoryId INT,
    @ItemName NVARCHAR(300),
    @Description NVARCHAR(2000),
    @Price DECIMAL(10,2),
    @ImageUrl NVARCHAR(2000) = NULL,
    @IsAvailable BIT,
    @IsPopular BIT,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.MenuItems
    SET
        CategoryId = @CategoryId,
        ItemName = @ItemName,
        Description = @Description,
        Price = @Price,
        ImageUrl = @ImageUrl,
        IsAvailable = @IsAvailable,
        IsPopular = @IsPopular,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE MenuItemId = @MenuItemId;

    SELECT *
    FROM dbo.MenuItems
    WHERE MenuItemId = @MenuItemId;
END;
GO
