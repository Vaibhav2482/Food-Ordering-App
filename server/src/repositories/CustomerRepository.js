import pool from "../config/db.js";

export const getCustomerByEmail = async (email) => {

    const result = await pool.query(
        `SELECT * FROM "Customers" WHERE "Email" = $1`,
        [email]
    );

    return result.rows[0];

};

export const getCustomerByPhone = async (phone) => {

    const result = await pool.query(
        `SELECT * FROM "Customers" WHERE "Phone" = $1`,
        [phone]
    );

    return result.rows[0];

};

export const createCustomer = async (customer) => {

    const result = await pool.query(
        `INSERT INTO "Customers" ("FullName", "Email", "Phone", "Password", "IsActive", "CreatedAt")
         VALUES ($1, $2, $3, $4, TRUE, NOW())
         RETURNING *`,
        [customer.fullName, customer.email, customer.phone, customer.password]
    );

    return result.rows[0];

};

export const customerLogin = async (email) => {

    const result = await pool.query(
        `SELECT "CustomerId", "FullName", "Email", "Phone", "Password", "IsActive"
         FROM "Customers"
         WHERE "Email" = $1 AND "IsActive" = TRUE`,
        [email]
    );

    return result.rows[0];

};

export const getCustomerById = async (customerId) => {

    const result = await pool.query(
        `SELECT "CustomerId", "FullName", "Email", "Phone", "IsActive", "CreatedAt", "UpdatedAt"
         FROM "Customers"
         WHERE "CustomerId" = $1 AND "IsActive" = TRUE`,
        [customerId]
    );

    return result.rows[0];

};

export const updateCustomer = async (customer) => {

    await pool.query(
        `UPDATE "Customers"
         SET "FullName" = $1, "Email" = $2, "Phone" = $3, "UpdatedAt" = NOW()
         WHERE "CustomerId" = $4 AND "IsActive" = TRUE`,
        [customer.fullName, customer.email, customer.phone, customer.customerId]
    );

    const result = await pool.query(
        `SELECT "CustomerId", "FullName", "Email", "Phone", "IsActive", "CreatedAt", "UpdatedAt"
         FROM "Customers"
         WHERE "CustomerId" = $1`,
        [customer.customerId]
    );

    return result.rows[0];

};

export const getAllCustomers = async () => {

    const result = await pool.query(`
        SELECT "CustomerId", "FullName", "Email", "Phone", "CreatedAt", "UpdatedAt"
        FROM "Customers"
        ORDER BY "CustomerId" DESC
    `);

    return result.rows;

};

export const deleteCustomer = async (customerId) => {

    const existingOrders = await pool.query(
        `SELECT 1 FROM "Orders" WHERE "CustomerId" = $1 LIMIT 1`,
        [customerId]
    );

    if (existingOrders.rows.length > 0) {
        throw new Error("Customer cannot be deleted because order history exists.");
    }

    await pool.query(`DELETE FROM "Cart" WHERE "CustomerId" = $1`, [customerId]);
    await pool.query(`DELETE FROM "CustomerAddresses" WHERE "CustomerId" = $1`, [customerId]);

    const result = await pool.query(`DELETE FROM "Customers" WHERE "CustomerId" = $1`, [customerId]);

    return { RowsAffected: result.rowCount };

};
