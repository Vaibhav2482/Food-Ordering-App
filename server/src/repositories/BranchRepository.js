import pool from "../config/db.js";

export const getActiveBranches = async () => {

    const result = await pool.query(`
        SELECT "BranchId", "BranchName", "Address", "City", "State", "Pincode", "Phone"
        FROM "Branches"
        WHERE "IsActive" = TRUE
        ORDER BY "BranchName"
    `);

    return result.rows;

};

export const getAllBranches = async () => {

    const result = await pool.query(`
        SELECT "BranchId", "BranchName", "Address", "City", "State", "Pincode", "Phone", "IsActive", "CreatedAt", "UpdatedAt"
        FROM "Branches"
        ORDER BY "BranchName"
    `);

    return result.rows;

};

export const getBranchById = async (branchId) => {

    const result = await pool.query(
        `SELECT "BranchId", "BranchName", "Address", "City", "State", "Pincode", "Phone", "IsActive", "CreatedAt", "UpdatedAt"
         FROM "Branches"
         WHERE "BranchId" = $1`,
        [branchId]
    );

    return result.rows[0];

};

export const createBranch = async (branch) => {

    const result = await pool.query(
        `INSERT INTO "Branches" ("BranchName", "Address", "City", "State", "Pincode", "Phone", "IsActive", "CreatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, TRUE, NOW())
         RETURNING *`,
        [
            branch.branchName,
            branch.address ?? null,
            branch.city ?? null,
            branch.state ?? null,
            branch.pincode ?? null,
            branch.phone ?? null
        ]
    );

    return result.rows[0];

};

export const updateBranch = async (branch) => {

    const result = await pool.query(
        `UPDATE "Branches"
         SET "BranchName" = $1, "Address" = $2, "City" = $3, "State" = $4, "Pincode" = $5, "Phone" = $6, "IsActive" = $7, "UpdatedAt" = NOW()
         WHERE "BranchId" = $8
         RETURNING *`,
        [
            branch.branchName,
            branch.address ?? null,
            branch.city ?? null,
            branch.state ?? null,
            branch.pincode ?? null,
            branch.phone ?? null,
            branch.isActive ?? true,
            branch.branchId
        ]
    );

    return result.rows[0];

};

export const deactivateBranch = async (branchId) => {

    const result = await pool.query(
        `UPDATE "Branches"
         SET "IsActive" = FALSE, "UpdatedAt" = NOW()
         WHERE "BranchId" = $1`,
        [branchId]
    );

    return { RowsAffected: result.rowCount };

};
