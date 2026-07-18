CREATE PROCEDURE dbo.sp_GetTableById
(
    @TableId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TableId,
        BranchId,
        TableName,
        Capacity,
        IsActive,
        CreatedAt,
        UpdatedAt
    FROM dbo.Tables
    WHERE TableId = @TableId;
END;
GO
