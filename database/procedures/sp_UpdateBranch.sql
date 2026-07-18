CREATE PROCEDURE dbo.sp_UpdateBranch
(
    @BranchId INT,
    @BranchName NVARCHAR(150),
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @State NVARCHAR(100) = NULL,
    @Pincode NVARCHAR(10) = NULL,
    @Phone NVARCHAR(20) = NULL,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Branches
    SET
        BranchName = @BranchName,
        Address = @Address,
        City = @City,
        State = @State,
        Pincode = @Pincode,
        Phone = @Phone,
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE BranchId = @BranchId;

    SELECT *
    FROM dbo.Branches
    WHERE BranchId = @BranchId;
END;
GO
