import sql from "../config/db.js";

export const getActiveBranches = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetActiveBranches");

    return result.recordset;

};

export const getAllBranches = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetAllBranches");

    return result.recordset;

};

export const getBranchById = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId)
        .execute("sp_GetBranchById");

    return result.recordset[0];

};

export const createBranch = async (branch) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchName", sql.NVarChar(150), branch.branchName)
        .input("Address", sql.NVarChar(500), branch.address ?? null)
        .input("City", sql.NVarChar(100), branch.city ?? null)
        .input("State", sql.NVarChar(100), branch.state ?? null)
        .input("Pincode", sql.NVarChar(10), branch.pincode ?? null)
        .input("Phone", sql.NVarChar(20), branch.phone ?? null)
        .execute("sp_CreateBranch");

    return result.recordset[0];

};

export const updateBranch = async (branch) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branch.branchId)
        .input("BranchName", sql.NVarChar(150), branch.branchName)
        .input("Address", sql.NVarChar(500), branch.address ?? null)
        .input("City", sql.NVarChar(100), branch.city ?? null)
        .input("State", sql.NVarChar(100), branch.state ?? null)
        .input("Pincode", sql.NVarChar(10), branch.pincode ?? null)
        .input("Phone", sql.NVarChar(20), branch.phone ?? null)
        .input("IsActive", sql.Bit, branch.isActive)
        .execute("sp_UpdateBranch");

    return result.recordset[0];

};

export const deactivateBranch = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId)
        .execute("sp_DeactivateBranch");

    return result.recordset[0];

};
