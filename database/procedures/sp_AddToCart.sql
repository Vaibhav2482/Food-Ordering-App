CREATE PROCEDURE dbo.sp_AddToCart
(
    @CustomerId INT,
    @MenuItemId INT,
    @Quantity INT
)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check Customer
    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.Customers
        WHERE CustomerId = @CustomerId
          AND IsActive = 1
    )
    BEGIN
        RAISERROR('Customer not found.',16,1);
        RETURN;
    END

    DECLARE @NewItemBranchId INT;

    SELECT @NewItemBranchId = BranchId
    FROM dbo.MenuItems
    WHERE MenuItemId = @MenuItemId
      AND IsAvailable = 1;

    IF @NewItemBranchId IS NULL
    BEGIN
        RAISERROR('Menu item not found.',16,1);
        RETURN;
    END

    -- Guard: a cart can only contain items from one branch at a time
    IF EXISTS
    (
        SELECT 1
        FROM dbo.Cart C
        INNER JOIN dbo.MenuItems M
            ON C.MenuItemId = M.MenuItemId
        WHERE C.CustomerId = @CustomerId
          AND M.BranchId <> @NewItemBranchId
    )
    BEGIN
        RAISERROR('Your cart has items from a different branch. Clear your cart before ordering from a new branch.',16,1);
        RETURN;
    END

    -- If already exists, increase quantity
    IF EXISTS
    (
        SELECT 1
        FROM dbo.Cart
        WHERE CustomerId = @CustomerId
          AND MenuItemId = @MenuItemId
    )
    BEGIN
        UPDATE dbo.Cart
        SET Quantity = Quantity + @Quantity
        WHERE CustomerId = @CustomerId
          AND MenuItemId = @MenuItemId;
    END
    ELSE
    BEGIN
        INSERT INTO dbo.Cart
        (
            CustomerId,
            MenuItemId,
            Quantity
        )
        VALUES
        (
            @CustomerId,
            @MenuItemId,
            @Quantity
        );
    END

    SELECT
        CartId,
        CustomerId,
        MenuItemId,
        Quantity,
        CreatedAt
    FROM dbo.Cart
    WHERE CustomerId = @CustomerId
      AND MenuItemId = @MenuItemId;
END;
GO
