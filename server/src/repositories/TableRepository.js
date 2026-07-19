import pool from "../config/db.js";

export const getActiveTables = async (branchId) => {

    const result = await pool.query(
        `SELECT "TableId", "BranchId", "TableName", "Capacity"
         FROM "Tables"
         WHERE "BranchId" = $1 AND "IsActive" = TRUE
         ORDER BY "TableName"`,
        [branchId]
    );

    return result.rows;

};

export const getAllTables = async (branchId) => {

    const result = await pool.query(
        `SELECT T."TableId", T."BranchId", B."BranchName", T."TableName", T."Capacity", T."IsActive", T."CreatedAt", T."UpdatedAt"
         FROM "Tables" T
         INNER JOIN "Branches" B ON T."BranchId" = B."BranchId"
         WHERE $1::int IS NULL OR T."BranchId" = $1
         ORDER BY B."BranchName", T."TableName"`,
        [branchId ?? null]
    );

    return result.rows;

};

export const getTableById = async (tableId) => {

    const result = await pool.query(
        `SELECT "TableId", "BranchId", "TableName", "Capacity", "IsActive", "CreatedAt", "UpdatedAt"
         FROM "Tables"
         WHERE "TableId" = $1`,
        [tableId]
    );

    return result.rows[0];

};

export const createTable = async (table) => {

    const result = await pool.query(
        `INSERT INTO "Tables" ("BranchId", "TableName", "Capacity", "IsActive", "CreatedAt")
         VALUES ($1, $2, $3, TRUE, NOW())
         RETURNING *`,
        [table.branchId, table.tableName, table.capacity ?? null]
    );

    return result.rows[0];

};

export const updateTable = async (table) => {

    const result = await pool.query(
        `UPDATE "Tables"
         SET "TableName" = $1, "Capacity" = $2, "IsActive" = $3, "UpdatedAt" = NOW()
         WHERE "TableId" = $4
         RETURNING *`,
        [table.tableName, table.capacity ?? null, table.isActive, table.tableId]
    );

    return result.rows[0];

};

export const deactivateTable = async (tableId) => {

    const result = await pool.query(
        `UPDATE "Tables"
         SET "IsActive" = FALSE, "UpdatedAt" = NOW()
         WHERE "TableId" = $1`,
        [tableId]
    );

    return { RowsAffected: result.rowCount };

};
