CREATE TABLE MenuItems (
    MenuItemId int IDENTITY(1,1) NOT NULL,
    BranchId int NOT NULL,
    CategoryId int NOT NULL,
    ItemName nvarchar(150) NOT NULL,
    Description nvarchar(500) NULL,
    Price decimal(10, 2) NOT NULL,
    ImageUrl nvarchar(500) NULL,
    IsAvailable bit NOT NULL DEFAULT ((1)),
    IsPopular bit NOT NULL DEFAULT ((0)),
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (MenuItemId)
);

ALTER TABLE MenuItems ADD CONSTRAINT FK_MenuItems_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId);
ALTER TABLE MenuItems ADD CONSTRAINT FK_MenuItems_Branches FOREIGN KEY (BranchId) REFERENCES Branches(BranchId);
