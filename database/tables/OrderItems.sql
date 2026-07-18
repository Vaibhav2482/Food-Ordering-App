CREATE TABLE OrderItems (
    OrderItemId int IDENTITY(1,1) NOT NULL,
    OrderId int NOT NULL,
    MenuItemId int NOT NULL,
    ItemName nvarchar(150) NOT NULL,
    Price decimal(10, 2) NOT NULL,
    Quantity int NOT NULL,
    TotalPrice decimal(10, 2) NOT NULL,
    PRIMARY KEY (OrderItemId)
);

ALTER TABLE OrderItems ADD CONSTRAINT FK_OrderItems_MenuItems FOREIGN KEY (MenuItemId) REFERENCES MenuItems(MenuItemId);
ALTER TABLE OrderItems ADD CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (OrderId) REFERENCES Orders(OrderId);
