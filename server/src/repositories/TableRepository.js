import sql from "../config/db.js";

export const getActiveTables = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId)
        .execute("sp_GetActiveTables");

    return result.recordset;

};

export const getAllTables = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetAllTables");

    return result.recordset;

};

export const getTableById = async (tableId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("TableId", sql.Int, tableId)
        .execute("sp_GetTableById");

    return result.recordset[0];

};

export const createTable = async (table) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, table.branchId)
        .input("TableName", sql.NVarChar(20), table.tableName)
        .input("Capacity", sql.Int, table.capacity ?? null)
        .execute("sp_CreateTable");

    return result.recordset[0];

};

export const updateTable = async (table) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("TableId", sql.Int, table.tableId)
        .input("TableName", sql.NVarChar(20), table.tableName)
        .input("Capacity", sql.Int, table.capacity ?? null)
        .input("IsActive", sql.Bit, table.isActive)
        .execute("sp_UpdateTable");

    return result.recordset[0];

};

export const deactivateTable = async (tableId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("TableId", sql.Int, tableId)
        .execute("sp_DeactivateTable");

    return result.recordset[0];

};
