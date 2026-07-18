CREATE PROCEDURE dbo.sp_UpdateOrderItems
(
    @OrderId INT,
    @Items NVARCHAR(MAX)
)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY

        BEGIN TRANSACTION;

        DECLARE @OrderStatus NVARCHAR(30);
        DECLARE @BranchId INT;

        SELECT
            @OrderStatus = OrderStatus,
            @BranchId = BranchId
        FROM dbo.Orders
        WHERE OrderId = @OrderId;

        IF @OrderStatus IS NULL
        BEGIN
            RAISERROR('Order not found.',16,1);
        END

        IF @OrderStatus <> 'Pending'
        BEGIN
            RAISERROR('Only pending orders can have their items edited.',16,1);
        END

        IF EXISTS (
            SELECT 1
            FROM OPENJSON(@Items)
            WITH (MenuItemId INT '$.menuItemId') J
            INNER JOIN dbo.MenuItems M ON M.MenuItemId = J.MenuItemId
            WHERE M.BranchId <> @BranchId
        )
        BEGIN
            RAISERROR('Items must belong to the order''s branch.',16,1);
        END

        IF NOT EXISTS (
            SELECT 1
            FROM OPENJSON(@Items)
            WITH (MenuItemId INT '$.menuItemId') J
            INNER JOIN dbo.MenuItems M ON M.MenuItemId = J.MenuItemId
        )
        BEGIN
            RAISERROR('Order must contain at least one valid item.',16,1);
        END

        DELETE FROM dbo.OrderItems
        WHERE OrderId = @OrderId;

        INSERT INTO dbo.OrderItems
        (
            OrderId,
            MenuItemId,
            ItemName,
            Price,
            Quantity,
            TotalPrice
        )
        SELECT
            @OrderId,
            M.MenuItemId,
            M.ItemName,
            M.Price,
            J.Quantity,
            M.Price * J.Quantity
        FROM OPENJSON(@Items)
        WITH
        (
            MenuItemId INT '$.menuItemId',
            Quantity INT '$.quantity'
        ) J
        INNER JOIN dbo.MenuItems M
            ON M.MenuItemId = J.MenuItemId;

        DECLARE @SubTotal DECIMAL(10,2);
        DECLARE @CgstAmount DECIMAL(10,2);
        DECLARE @SgstAmount DECIMAL(10,2);
        DECLARE @TotalAmount DECIMAL(10,2);

        SELECT @SubTotal = SUM(TotalPrice)
        FROM dbo.OrderItems
        WHERE OrderId = @OrderId;

        SET @CgstAmount = ROUND(@SubTotal * 0.025, 2);
        SET @SgstAmount = ROUND(@SubTotal * 0.025, 2);
        SET @TotalAmount = @SubTotal + @CgstAmount + @SgstAmount;

        UPDATE dbo.Orders
        SET
            SubTotal = @SubTotal,
            CgstAmount = @CgstAmount,
            SgstAmount = @SgstAmount,
            TotalAmount = @TotalAmount
        WHERE OrderId = @OrderId;

        COMMIT TRANSACTION;

        SELECT O.*, B.BranchName
        FROM dbo.Orders O
        INNER JOIN dbo.Branches B ON O.BranchId = B.BranchId
        WHERE O.OrderId = @OrderId;

    END TRY
    BEGIN CATCH

        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;

    END CATCH
END;
GO
