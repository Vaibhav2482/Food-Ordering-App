CREATE PROCEDURE dbo.sp_CreateTable
(
    @BranchId INT,
    @TableName NVARCHAR(20),
    @Capacity INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Tables
    (
        BranchId,
        TableName,
        Capacity,
        IsActive,
        CreatedAt
    )
    VALUES
    (
        @BranchId,
        @TableName,
        @Capacity,
        1,
        GETDATE()
    );

    SELECT *
    FROM dbo.Tables
    WHERE TableId = SCOPE_IDENTITY();
END;
GO
