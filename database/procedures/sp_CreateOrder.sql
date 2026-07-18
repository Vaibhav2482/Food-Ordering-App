CREATE   PROCEDURE dbo.sp_CreateOrder
(
    @CustomerId INT,
    @AddressId INT = NULL,
    @DeliveryType NVARCHAR(20) = 'Delivery',
    @PaymentMethod NVARCHAR(100),
    @Notes NVARCHAR(2000) = NULL,
    @Items NVARCHAR(MAX),
    @TableNumber NVARCHAR(20) = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY

        BEGIN TRANSACTION;

        IF NOT EXISTS
        (
            SELECT 1
            FROM dbo.Customers
            WHERE CustomerId = @CustomerId
              AND IsActive = 1
        )
        BEGIN
            RAISERROR('Customer not found.',16,1);
        END

        IF @DeliveryType = 'Delivery'
        BEGIN

            IF @AddressId IS NULL
            BEGIN
                RAISERROR('Address is required for delivery orders.',16,1);
            END

            IF NOT EXISTS
            (
                SELECT 1
                FROM dbo.CustomerAddresses
                WHERE AddressId = @AddressId
                  AND CustomerId = @CustomerId
            )
            BEGIN
                RAISERROR('Customer address not found.',16,1);
            END

        END

        DECLARE @BranchCount INT;
        DECLARE @BranchId INT;

        SELECT
            @BranchCount = COUNT(DISTINCT M.BranchId),
            @BranchId = MIN(M.BranchId)
        FROM OPENJSON(@Items)
        WITH
        (
            MenuItemId INT '$.menuItemId',
            Quantity INT '$.quantity'
        ) J
        INNER JOIN dbo.MenuItems M
            ON M.MenuItemId = J.MenuItemId;

        IF @BranchCount IS NULL OR @BranchCount = 0
        BEGIN
            RAISERROR('Order must contain valid menu items.',16,1);
        END

        IF @BranchCount > 1
        BEGIN
            RAISERROR('Order items belong to more than one branch. Place separate orders per branch.',16,1);
        END

        DECLARE @SubTotal DECIMAL(10,2);
        DECLARE @CgstAmount DECIMAL(10,2);
        DECLARE @SgstAmount DECIMAL(10,2);
        DECLARE @TotalAmount DECIMAL(10,2);

        SELECT
            @SubTotal = SUM(M.Price * J.Quantity)
        FROM OPENJSON(@Items)
        WITH
        (
            MenuItemId INT '$.menuItemId',
            Quantity INT '$.quantity'
        ) J
        INNER JOIN dbo.MenuItems M
            ON M.MenuItemId = J.MenuItemId;

        SET @CgstAmount = ROUND(@SubTotal * 0.025, 2);
        SET @SgstAmount = ROUND(@SubTotal * 0.025, 2);
        SET @TotalAmount = @SubTotal + @CgstAmount + @SgstAmount;

        INSERT INTO dbo.Orders
        (
            BranchId,
            CustomerId,
            AddressId,
            DeliveryType,
            PaymentMethod,
            SubTotal,
            CgstAmount,
            SgstAmount,
            TotalAmount,
            OrderStatus,
            OrderNotes,
            OrderDate,
            TableNumber
        )
        VALUES
        (
            @BranchId,
            @CustomerId,
            @AddressId,
            @DeliveryType,
            @PaymentMethod,
            @SubTotal,
            @CgstAmount,
            @SgstAmount,
            @TotalAmount,
            'Pending',
            @Notes,
            GETDATE(),
            @TableNumber
        );

        DECLARE @OrderId INT = SCOPE_IDENTITY();

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
