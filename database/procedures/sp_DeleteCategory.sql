CREATE PROCEDURE [dbo].[sp_DeleteCategory]
(
    @CategoryId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.Categories
    WHERE CategoryId = @CategoryId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
