CREATE PROCEDURE dbo.sp_CreateBranch
(
    @BranchName NVARCHAR(150),
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @Pincode NVARCHAR(10) = NULL,
    @Phone NVARCHAR(20) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Branches
    (
        BranchName,
        Address,
        City,
        State,
        Pincode,
        Phone,
        IsActive,
        CreatedAt
    )
    VALUES
    (
        @BranchName,
        @Address,
        @City,
        @State,
        @Pincode,
        @Phone,
        1,
        GETDATE()
    );

    SELECT *
    FROM dbo.Branches
    WHERE BranchId = SCOPE_IDENTITY();
END;
GO
