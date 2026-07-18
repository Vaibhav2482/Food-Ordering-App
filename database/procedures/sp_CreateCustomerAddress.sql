CREATE PROCEDURE dbo.sp_CreateCustomerAddress
(
    @CustomerId INT,
    @AddressTitle NVARCHAR(100),
    @FullAddress NVARCHAR(MAX),
    @City NVARCHAR(100),
    @State NVARCHAR(100),
    @Pincode NVARCHAR(20),
    @Landmark NVARCHAR(200),
    @IsDefault BIT
)
AS
BEGIN
    SET NOCOUNT ON;

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

    IF @IsDefault = 1
    BEGIN
        UPDATE dbo.CustomerAddresses
        SET IsDefault = 0
        WHERE CustomerId = @CustomerId;
    END

    INSERT INTO dbo.CustomerAddresses
    (
        CustomerId,
        AddressTitle,
        FullAddress,
        City,
        State,
        Pincode,
        Landmark,
        IsDefault
    )
    VALUES
    (
        @CustomerId,
        @AddressTitle,
        @FullAddress,
        @City,
        @State,
        @Pincode,
        @Landmark,
        @IsDefault
    );

    SELECT *
    FROM dbo.CustomerAddresses
    WHERE AddressId = SCOPE_IDENTITY();
END;
GO
