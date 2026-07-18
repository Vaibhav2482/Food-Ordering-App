CREATE PROCEDURE dbo.sp_GetBranchById
(
    @BranchId INT
)
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
    WHERE BranchId = @BranchId;
END;
GO
