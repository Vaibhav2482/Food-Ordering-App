CREATE PROCEDURE dbo.sp_GetActiveTables
(
    @BranchId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TableId,
        BranchId,
        TableName,
        Capacity
    FROM dbo.Tables
    WHERE BranchId = @BranchId
      AND IsActive = 1
    ORDER BY TableName;
END;
GO
