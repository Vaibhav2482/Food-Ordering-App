import sql from "mssql";

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