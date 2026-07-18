CREATE PROCEDURE dbo.sp_AdminLogin
(
    @Email NVARCHAR(255)
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        A.AdminId,
        A.FullName,
        A.Email,
        A.Password,
        A.BranchId,
        B.BranchName
    FROM dbo.Admins A
    LEFT JOIN dbo.Branches B
        ON A.BranchId = B.BranchId
    WHERE A.Email = @Email
      AND A.IsActive = 1;
END
GO
