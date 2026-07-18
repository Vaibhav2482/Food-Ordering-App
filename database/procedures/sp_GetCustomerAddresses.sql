CREATE   PROCEDURE dbo.sp_GetCustomerAddresses
(
    @CustomerId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        AddressId,
        CustomerId,
        AddressTitle,
        FullAddress,
        City,
        State,
        Pincode,
        Landmark,
        IsDefault,
        CreatedAt
    FROM dbo.CustomerAddresses
    WHERE CustomerId = @CustomerId
    ORDER BY IsDefault DESC, AddressId DESC;
END;
GO
