CREATE PROCEDURE dbo.sp_DeactivateBranch
(
    @BranchId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Branches
    SET
        IsActive = 0,
        UpdatedAt = GETDATE()
    WHERE BranchId = @BranchId;

    SELECT @@ROWCOUNT AS RowsAffected;
END;
GO
