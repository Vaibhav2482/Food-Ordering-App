CREATE PROCEDURE dbo.sp_DeactivateAdmin
(
    @AdminId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Admins
    SET
        IsActive = 0,
        UpdatedAt = GETDATE()
    WHERE AdminId = @AdminId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
