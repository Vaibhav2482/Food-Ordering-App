CREATE PROCEDURE dbo.sp_DeleteMenuItem
(
    @MenuItemId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.MenuItems
    WHERE MenuItemId = @MenuItemId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
