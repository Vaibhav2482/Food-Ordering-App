CREATE PROCEDURE dbo.sp_GetActiveBranches
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
        Phone
    FROM dbo.Branches
    WHERE IsActive = 1
    ORDER BY BranchName;
END;
GO
