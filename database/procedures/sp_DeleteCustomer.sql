CREATE PROCEDURE [dbo].[sp_DeleteCustomer]
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS
    (
        SELECT 1
        FROM dbo.Orders
        WHERE CustomerId = @CustomerId
    )
    BEGIN

        RAISERROR(
            'Customer cannot be deleted because order history exists.',
            16,
            1
        );

        RETURN;

    END

    DELETE
    FROM dbo.Cart
    WHERE CustomerId = @CustomerId;

    DELETE
    FROM dbo.CustomerAddresses
    WHERE CustomerId = @CustomerId;

    DELETE
    FROM dbo.Customers
    WHERE CustomerId = @CustomerId;

    SELECT @@ROWCOUNT AS RowsAffected;

END;
GO
