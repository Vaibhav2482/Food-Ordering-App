import sql from "../config/db.js";

export const createCustomerAddress = async (address) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, address.customerId)
        .input("AddressTitle", sql.NVarChar(100), address.addressTitle)
        .input("FullAddress", sql.NVarChar(sql.MAX), address.fullAddress)
        .input("City", sql.NVarChar(100), address.city)
        .input("State", sql.NVarChar(100), address.state)
        .input("Pincode", sql.NVarChar(20), address.pincode)
        .input("Landmark", sql.NVarChar(200), address.landmark)
        .input("IsDefault", sql.Bit, address.isDefault)
        .execute("sp_CreateCustomerAddress");

    return result.recordset[0];

};

export const getCustomerAddresses = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_GetCustomerAddresses");

    return result.recordset;

};

export const getCustomerAddressById = async (addressId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("AddressId", sql.Int, addressId)
        .query("SELECT * FROM dbo.CustomerAddresses WHERE AddressId = @AddressId");

    return result.recordset[0];

};

export const updateCustomerAddress = async (address) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("AddressId", sql.Int, address.addressId)
        .input("AddressTitle", sql.NVarChar(100), address.addressTitle)
        .input("FullAddress", sql.NVarChar(sql.MAX), address.fullAddress)
        .input("City", sql.NVarChar(100), address.city)
        .input("State", sql.NVarChar(100), address.state)
        .input("Pincode", sql.NVarChar(20), address.pincode)
        .input("Landmark", sql.NVarChar(200), address.landmark)
        .input("IsDefault", sql.Bit, address.isDefault)
        .execute("sp_UpdateCustomerAddress");

    return result.recordset[0];

};

export const deleteCustomerAddress = async (addressId) => {

    const pool = await sql.connect();

    await pool
        .request()
        .input("AddressId", sql.Int, addressId)
        .execute("sp_DeleteCustomerAddress");

};
