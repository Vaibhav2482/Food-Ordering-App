CREATE PROCEDURE dbo.sp_CreateMenuItem
(
    @BranchId INT,
    @CategoryId INT,
    @ItemName NVARCHAR(300),
    @Description NVARCHAR(2000),
    @Price DECIMAL(10,2),
    @ImageUrl NVARCHAR(2000),
    @IsAvailable BIT,
    @IsPopular BIT,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.MenuItems
    (
        BranchId,
        CategoryId,
        ItemName,
        Description,
        Price,
        ImageUrl,
        IsAvailable,
        IsPopular,
        IsActive
    )
    VALUES
    (
        @BranchId,
        @CategoryId,
        @ItemName,
        @Description,
        @Price,
        @ImageUrl,
        @IsAvailable,
        @IsPopular,
        @IsActive
    );

    SELECT SCOPE_IDENTITY() AS MenuItemId;
END;
GO
