CREATE   PROCEDURE dbo.sp_UpdateCustomerAddress
(
    @AddressId INT,
    @AddressTitle NVARCHAR(50),
    @FullAddress NVARCHAR(500),
    @City NVARCHAR(100),
    @State NVARCHAR(100),
    @Pincode NVARCHAR(10),
    @Landmark NVARCHAR(150) = NULL,
    @IsDefault BIT = 0
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CustomerId INT = (SELECT CustomerId FROM dbo.CustomerAddresses WHERE AddressId = @AddressId);

    IF @IsDefault = 1
    BEGIN
        UPDATE dbo.CustomerAddresses
        SET IsDefault = 0
        WHERE CustomerId = @CustomerId
          AND AddressId <> @AddressId;
    END

    UPDATE dbo.CustomerAddresses
    SET
        AddressTitle = @AddressTitle,
        FullAddress = @FullAddress,
        City = @City,
        State = @State,
        Pincode = @Pincode,
        Landmark = @Landmark,
        IsDefault = @IsDefault
    WHERE AddressId = @AddressId;

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
    WHERE AddressId = @AddressId;
END;
GO
