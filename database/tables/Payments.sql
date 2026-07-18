CREATE TABLE Payments (
    PaymentId int IDENTITY(1,1) NOT NULL,
    OrderId int NOT NULL,
    PaymentMethod nvarchar(20) NOT NULL,
    Amount decimal(10, 2) NOT NULL,
    PaymentStatus nvarchar(20) NOT NULL,
    TransactionId nvarchar(150) NULL,
    PaymentDate datetime NOT NULL DEFAULT (getdate()),
    PRIMARY KEY (PaymentId)
);

ALTER TABLE Payments ADD CONSTRAINT FK_Payments_Orders FOREIGN KEY (OrderId) REFERENCES Orders(OrderId);
