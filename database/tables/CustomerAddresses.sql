CREATE TABLE CustomerAddresses (
    AddressId int IDENTITY(1,1) NOT NULL,
    CustomerId int NOT NULL,
    AddressTitle nvarchar(50) NOT NULL,
    FullAddress nvarchar(500) NOT NULL,
    City nvarchar(100) NOT NULL,
    State nvarchar(100) NOT NULL,
    Pincode nvarchar(10) NOT NULL,
    Landmark nvarchar(150) NULL,
    IsDefault bit NOT NULL DEFAULT ((0)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    PRIMARY KEY (AddressId)
);

ALTER TABLE CustomerAddresses ADD CONSTRAINT FK_CustomerAddresses_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId);
