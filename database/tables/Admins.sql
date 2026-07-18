CREATE TABLE Admins (
    AdminId int IDENTITY(1,1) NOT NULL,
    FullName nvarchar(100) NOT NULL,
    Email nvarchar(150) NOT NULL,
    Password nvarchar(100) NOT NULL,
    BranchId int NULL,
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (AdminId)
);

ALTER TABLE Admins ADD CONSTRAINT FK_Admins_Branches FOREIGN KEY (BranchId) REFERENCES Branches(BranchId);
