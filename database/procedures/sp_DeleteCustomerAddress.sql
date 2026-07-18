CREATE   PROCEDURE dbo.sp_DeleteCustomerAddress
(
    @AddressId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM dbo.CustomerAddresses
    WHERE AddressId = @AddressId;
END;
GO
