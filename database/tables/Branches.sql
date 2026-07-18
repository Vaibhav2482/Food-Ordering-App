CREATE TABLE Branches (
    BranchId int IDENTITY(1,1) NOT NULL,
    BranchName nvarchar(150) NOT NULL,
    Address nvarchar(500) NULL,
    City nvarchar(100) NULL,
    State nvarchar(100) NULL,
    Pincode nvarchar(10) NULL,
    Phone nvarchar(20) NULL,
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (BranchId)
);
