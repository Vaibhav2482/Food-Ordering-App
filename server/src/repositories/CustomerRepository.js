import sql from "../config/db.js";

export const getCustomerByEmail = async (email) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Email", sql.NVarChar(100), email)
        .query(`
            SELECT *
            FROM dbo.Customers
            WHERE Email = @Email
        `);

    return result.recordset[0];

};

export const getCustomerByPhone = async (phone) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Phone", sql.NVarChar(15), phone)
        .query(`
            SELECT *
            FROM dbo.Customers
            WHERE Phone = @Phone
        `);

    return result.recordset[0];

};

export const createCustomer = async (customer) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("FullName", sql.NVarChar(100), customer.fullName)
        .input("Email", sql.NVarChar(100), customer.email)
        .input("Phone", sql.NVarChar(15), customer.phone)
        .input("Password", sql.NVarChar(255), customer.password)
        .execute("sp_CreateCustomer");

    return result.recordset[0];

};

export const customerLogin = async (email) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Email", sql.NVarChar(100), email)
        .execute("sp_CustomerLogin");

    return result.recordset[0];

};

export const getCustomerById = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_GetCustomerById");

    return result.recordset[0];

};

export const updateCustomer = async (customer) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customer.customerId)
        .input("FullName", sql.NVarChar(100), customer.fullName)
        .input("Email", sql.NVarChar(100), customer.email)
        .input("Phone", sql.NVarChar(15), customer.phone)
        .execute("sp_UpdateCustomer");

    return result.recordset[0];

};

export const getAllCustomers = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetAllCustomers");

    return result.recordset;

};

export const deleteCustomer = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_DeleteCustomer");

    return result.recordset[0];

};