-- Postgres port of the SQL Server schema in database/tables/*.sql
-- Identifiers are double-quoted throughout to preserve the exact PascalCase
-- names the rest of the codebase (controllers, services, and the two React
-- frontends) already expects on every row (e.g. row.BranchName, row.OrderId).
-- Every query written against this schema MUST quote identifiers the same
-- way, or Postgres will silently fold them to lowercase and break every
-- consumer that expects PascalCase fields.

CREATE TABLE "Branches" (
    "BranchId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "BranchName" VARCHAR(150) NOT NULL,
    "Address" VARCHAR(500) NULL,
    "City" VARCHAR(100) NULL,
    "State" VARCHAR(100) NULL,
    "Pincode" VARCHAR(10) NULL,
    "Phone" VARCHAR(20) NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("BranchId")
);

CREATE TABLE "Admins" (
    "AdminId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "FullName" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(150) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "BranchId" INT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("AdminId")
);

ALTER TABLE "Admins" ADD CONSTRAINT "FK_Admins_Branches" FOREIGN KEY ("BranchId") REFERENCES "Branches"("BranchId");

CREATE TABLE "Categories" (
    "CategoryId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "CategoryName" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(300) NULL,
    "ImageUrl" VARCHAR(500) NULL,
    "DisplayOrder" INT NOT NULL DEFAULT 1,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("CategoryId")
);

CREATE TABLE "Customers" (
    "CustomerId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "FullName" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(150) NOT NULL,
    "Phone" VARCHAR(15) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("CustomerId")
);

CREATE TABLE "OtpCodes" (
    "OtpId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "Phone" VARCHAR(15) NOT NULL,
    "OtpHash" VARCHAR(255) NOT NULL,
    "ExpiresAt" TIMESTAMP NOT NULL,
    "Attempts" INT NOT NULL DEFAULT 0,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("OtpId"),
    CONSTRAINT "UQ_OtpCodes_Phone" UNIQUE ("Phone")
);

CREATE TABLE "CustomerAddresses" (
    "AddressId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "CustomerId" INT NOT NULL,
    "AddressTitle" VARCHAR(50) NOT NULL,
    "FullAddress" VARCHAR(500) NOT NULL,
    "City" VARCHAR(100) NOT NULL,
    "State" VARCHAR(100) NOT NULL,
    "Pincode" VARCHAR(10) NOT NULL,
    "Landmark" VARCHAR(150) NULL,
    "IsDefault" BOOLEAN NOT NULL DEFAULT FALSE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("AddressId")
);

ALTER TABLE "CustomerAddresses" ADD CONSTRAINT "FK_CustomerAddresses_Customers" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("CustomerId");

CREATE TABLE "MenuItems" (
    "MenuItemId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "BranchId" INT NOT NULL,
    "CategoryId" INT NOT NULL,
    "ItemName" VARCHAR(150) NOT NULL,
    "Description" VARCHAR(500) NULL,
    "Price" NUMERIC(10, 2) NOT NULL,
    "ImageUrl" VARCHAR(500) NULL,
    "IsAvailable" BOOLEAN NOT NULL DEFAULT TRUE,
    "IsPopular" BOOLEAN NOT NULL DEFAULT FALSE,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("MenuItemId")
);

ALTER TABLE "MenuItems" ADD CONSTRAINT "FK_MenuItems_Categories" FOREIGN KEY ("CategoryId") REFERENCES "Categories"("CategoryId");
ALTER TABLE "MenuItems" ADD CONSTRAINT "FK_MenuItems_Branches" FOREIGN KEY ("BranchId") REFERENCES "Branches"("BranchId");

CREATE TABLE "Tables" (
    "TableId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "BranchId" INT NOT NULL,
    "TableName" VARCHAR(20) NOT NULL,
    "Capacity" INT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "UpdatedAt" TIMESTAMP NULL,
    PRIMARY KEY ("TableId")
);

ALTER TABLE "Tables" ADD CONSTRAINT "FK_Tables_Branches" FOREIGN KEY ("BranchId") REFERENCES "Branches"("BranchId");

CREATE TABLE "Cart" (
    "CartId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "CustomerId" INT NOT NULL,
    "MenuItemId" INT NOT NULL,
    "Quantity" INT NOT NULL DEFAULT 1,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("CartId")
);

ALTER TABLE "Cart" ADD CONSTRAINT "FK_Cart_Customers" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("CustomerId");
ALTER TABLE "Cart" ADD CONSTRAINT "FK_Cart_MenuItems" FOREIGN KEY ("MenuItemId") REFERENCES "MenuItems"("MenuItemId");

CREATE TABLE "Orders" (
    "OrderId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "BranchId" INT NOT NULL,
    "CustomerId" INT NOT NULL,
    "AddressId" INT NULL,
    "DeliveryType" VARCHAR(20) NOT NULL,
    "PaymentMethod" VARCHAR(20) NOT NULL,
    "SubTotal" NUMERIC(10, 2) NULL,
    "CgstAmount" NUMERIC(10, 2) NULL,
    "SgstAmount" NUMERIC(10, 2) NULL,
    "TotalAmount" NUMERIC(10, 2) NOT NULL,
    "OrderStatus" VARCHAR(30) NOT NULL DEFAULT 'Pending',
    "OrderNotes" VARCHAR(500) NULL,
    "OrderDate" TIMESTAMP NOT NULL DEFAULT NOW(),
    "TableNumber" VARCHAR(20) NULL,
    PRIMARY KEY ("OrderId")
);

ALTER TABLE "Orders" ADD CONSTRAINT "FK_Orders_Customers" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("CustomerId");
ALTER TABLE "Orders" ADD CONSTRAINT "FK_Orders_Branches" FOREIGN KEY ("BranchId") REFERENCES "Branches"("BranchId");
ALTER TABLE "Orders" ADD CONSTRAINT "FK_Orders_CustomerAddresses" FOREIGN KEY ("AddressId") REFERENCES "CustomerAddresses"("AddressId");

CREATE TABLE "OrderItems" (
    "OrderItemId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "OrderId" INT NOT NULL,
    "MenuItemId" INT NOT NULL,
    "ItemName" VARCHAR(150) NOT NULL,
    "Price" NUMERIC(10, 2) NOT NULL,
    "Quantity" INT NOT NULL,
    "TotalPrice" NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY ("OrderItemId")
);

ALTER TABLE "OrderItems" ADD CONSTRAINT "FK_OrderItems_MenuItems" FOREIGN KEY ("MenuItemId") REFERENCES "MenuItems"("MenuItemId");
ALTER TABLE "OrderItems" ADD CONSTRAINT "FK_OrderItems_Orders" FOREIGN KEY ("OrderId") REFERENCES "Orders"("OrderId");

CREATE TABLE "Payments" (
    "PaymentId" INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    "OrderId" INT NOT NULL,
    "PaymentMethod" VARCHAR(20) NOT NULL,
    "Amount" NUMERIC(10, 2) NOT NULL,
    "PaymentStatus" VARCHAR(20) NOT NULL,
    "TransactionId" VARCHAR(150) NULL,
    "PaymentDate" TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("PaymentId")
);

ALTER TABLE "Payments" ADD CONSTRAINT "FK_Payments_Orders" FOREIGN KEY ("OrderId") REFERENCES "Orders"("OrderId");
