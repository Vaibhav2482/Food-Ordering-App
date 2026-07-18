CREATE PROCEDURE dbo.sp_GetAllBranches
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        BranchId,
        BranchName,
        Address,
        City,
        State,
        Pincode,
        Phone,
        IsActive,
        CreatedAt,
        UpdatedAt
    FROM dbo.Branches
    ORDER BY BranchName;
END;
GO
