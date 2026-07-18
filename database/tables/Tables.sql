CREATE TABLE Tables (
    TableId int IDENTITY(1,1) NOT NULL,
    BranchId int NOT NULL,
    TableName nvarchar(20) NOT NULL,
    Capacity int NULL,
    IsActive bit NOT NULL DEFAULT ((1)),
    CreatedAt datetime NOT NULL DEFAULT (getdate()),
    UpdatedAt datetime NULL,
    PRIMARY KEY (TableId)
);

ALTER TABLE Tables ADD CONSTRAINT FK_Tables_Branches FOREIGN KEY (BranchId) REFERENCES Branches(BranchId);
