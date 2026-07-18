CREATE TABLE Orders (
    OrderId int IDENTITY(1,1) NOT NULL,
    BranchId int NOT NULL,
    CustomerId int NOT NULL,
    AddressId int NULL,
    DeliveryType nvarchar(20) NOT NULL,
    PaymentMethod nvarchar(20) NOT NULL,
    SubTotal decimal(10, 2) NULL,
    CgstAmount decimal(10, 2) NULL,
    SgstAmount decimal(10, 2) NULL,
    TotalAmount decimal(10, 2) NOT NULL,
    OrderStatus nvarchar(30) NOT NULL DEFAULT ('Pending'),
    OrderNotes nvarchar(500) NULL,
    OrderDate datetime NOT NULL DEFAULT (getdate()),
    TableNumber nvarchar(20) NULL,
    PRIMARY KEY (OrderId)
);

ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId);
ALTER TABLE Orders ADD CONSTRAINT FK_Orders_Branches FOREIGN KEY (BranchId) REFERENCES Branches(BranchId);
ALTER TABLE Orders ADD CONSTRAINT FK_Orders_CustomerAddresses FOREIGN KEY (AddressId) REFERENCES CustomerAddresses(AddressId);
