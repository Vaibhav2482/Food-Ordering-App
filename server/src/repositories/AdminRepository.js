import sql from "../config/db.js";

export const getAdminByEmail = async (email) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("Email", sql.NVarChar(150), email)
        .query(`
            SELECT *
            FROM dbo.Admins
            WHERE Email = @Email
        `);

    return result.recordset[0];

};

export const getAllAdmins = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetAllAdmins");

    return result.recordset;

};

export const getAdminById = async (adminId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("AdminId", sql.Int, adminId)
        .execute("sp_GetAdminById");

    return result.recordset[0];

};

export const createAdmin = async (admin) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("FullName", sql.NVarChar(100), admin.fullName)
        .input("Email", sql.NVarChar(150), admin.email)
        .input("Password", sql.NVarChar(100), admin.password)
        .input("BranchId", sql.Int, admin.branchId ?? null)
        .execute("sp_CreateAdmin");

    return result.recordset[0];

};

export const updateAdmin = async (admin) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("AdminId", sql.Int, admin.adminId)
        .input("FullName", sql.NVarChar(100), admin.fullName)
        .input("Email", sql.NVarChar(150), admin.email)
        .input("BranchId", sql.Int, admin.branchId ?? null)
        .input("IsActive", sql.Bit, admin.isActive)
        .execute("sp_UpdateAdmin");

    return result.recordset[0];

};

export const deactivateAdmin = async (adminId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("AdminId", sql.Int, adminId)
        .execute("sp_DeactivateAdmin");

    return result.recordset[0];

};
