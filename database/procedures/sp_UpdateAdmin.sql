CREATE PROCEDURE dbo.sp_UpdateAdmin
(
    @AdminId INT,
    @FullName NVARCHAR(100),
    @Email NVARCHAR(150),
    @BranchId INT = NULL,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Admins
    SET
        FullName = @FullName,
        Email = @Email,
        BranchId = @BranchId,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE AdminId = @AdminId;

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
    WHERE A.AdminId = @AdminId;
END;
GO
