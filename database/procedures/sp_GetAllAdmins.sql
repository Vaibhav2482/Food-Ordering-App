CREATE PROCEDURE dbo.sp_GetAllAdmins
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        A.AdminId,
        A.FullName,
        A.Email,
        A.BranchId,
        B.BranchName,
        A.IsActive,
        A.CreatedAt,
        A.UpdatedAt
    FROM dbo.Admins A
    LEFT JOIN dbo.Branches B
        ON A.BranchId = B.BranchId
    ORDER BY A.FullName;
END;
GO
