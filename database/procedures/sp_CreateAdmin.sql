CREATE PROCEDURE dbo.sp_CreateAdmin
(
    @FullName NVARCHAR(100),
    @Email NVARCHAR(150),
    @Password NVARCHAR(100),
    @BranchId INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Admins
    (
        FullName,
        Email,
        Password,
        BranchId,
        IsActive,
        CreatedAt
    )
    VALUES
    (
        @FullName,
        @Email,
        @Password,
        @BranchId,
        1,
        GETDATE()
    );

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
    WHERE A.AdminId = SCOPE_IDENTITY();
END;
GO
