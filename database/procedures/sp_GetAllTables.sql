CREATE PROCEDURE dbo.sp_GetAllTables
(
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        T.TableId,
        T.BranchId,
        B.BranchName,
        T.TableName,
        T.Capacity,
        T.IsActive,
        T.CreatedAt,
        T.UpdatedAt
    FROM dbo.Tables T
    INNER JOIN dbo.Branches B
        ON T.BranchId = B.BranchId
    WHERE @BranchId IS NULL OR T.BranchId = @BranchId
    ORDER BY B.BranchName, T.TableName;
END;
GO
