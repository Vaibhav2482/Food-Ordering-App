CREATE TABLE Categories (
    CategoryId int IDENTITY(1,1) NOT NULL,
    CategoryName nvarchar(100) NOT NULL,
    Description nvarchar(300) NULL,
    ImageUrl nvarchar(500) NULL,
    DisplayOrder int NOT NULL DEFAULT ((1)),
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (CategoryId)
);
