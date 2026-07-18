CREATE PROCEDURE dbo.sp_DeactivateTable
(
    @TableId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Tables
    SET
        IsActive = 0,
        UpdatedAt = GETDATE()
    WHERE TableId = @TableId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
