CREATE PROCEDURE dbo.sp_UpdateTable
(
    @TableId INT,
    @TableName NVARCHAR(20),
    @Capacity INT = NULL,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Tables
    SET
        TableName = @TableName,
        Capacity = @Capacity,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE TableId = @TableId;

    SELECT *
    FROM dbo.Tables
    WHERE TableId = @TableId;
END;
GO
