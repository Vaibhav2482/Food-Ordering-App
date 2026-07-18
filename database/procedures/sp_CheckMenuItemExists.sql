CREATE   PROCEDURE dbo.sp_CheckMenuItemExists
(
    @ItemName NVARCHAR(300),
    @BranchId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        MenuItemId
    FROM dbo.MenuItems
    WHERE ItemName = @ItemName
      AND BranchId = @BranchId;
END;
GO
