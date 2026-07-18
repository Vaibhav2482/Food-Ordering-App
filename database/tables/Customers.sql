CREATE TABLE Customers (
    CustomerId int IDENTITY(1,1) NOT NULL,
    FullName nvarchar(100) NOT NULL,
    Email nvarchar(150) NOT NULL,
    Phone nvarchar(15) NOT NULL,
    Password nvarchar(100) NOT NULL,
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (CustomerId)
);
