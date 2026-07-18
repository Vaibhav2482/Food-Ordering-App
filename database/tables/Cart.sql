CREATE TABLE Cart (
    CartId int IDENTITY(1,1) NOT NULL,
    CustomerId int NOT NULL,
    MenuItemId int NOT NULL,
    Quantity int NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    PRIMARY KEY (CartId)
);

ALTER TABLE Cart ADD CONSTRAINT FK_Cart_Customers FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId);
ALTER TABLE Cart ADD CONSTRAINT FK_Cart_MenuItems FOREIGN KEY (MenuItemId) REFERENCES MenuItems(MenuItemId);
