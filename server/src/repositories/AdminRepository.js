import pool from "../config/db.js";

export const getAdminByEmail = async (email) => {

    const result = await pool.query(
        `SELECT * FROM "Admins" WHERE "Email" = $1`,
        [email]
    );

    return result.rows[0];

};

export const getAllAdmins = async () => {

    const result = await pool.query(`
        SELECT A."AdminId", A."FullName", A."Email", A."BranchId", B."BranchName", A."IsActive", A."CreatedAt", A."UpdatedAt"
        FROM "Admins" A
        LEFT JOIN "Branches" B ON A."BranchId" = B."BranchId"
        ORDER BY A."FullName"
    `);

    return result.rows;

};

export const getAdminById = async (adminId) => {

    const result = await pool.query(
        `SELECT A."AdminId", A."FullName", A."Email", A."BranchId", B."BranchName", A."IsActive", A."CreatedAt", A."UpdatedAt"
         FROM "Admins" A
         LEFT JOIN "Branches" B ON A."BranchId" = B."BranchId"
         WHERE A."AdminId" = $1`,
        [adminId]
    );

    return result.rows[0];

};

export const createAdmin = async (admin) => {

    const inserted = await pool.query(
        `INSERT INTO "Admins" ("FullName", "Email", "Password", "BranchId", "IsActive", "CreatedAt")
         VALUES ($1, $2, $3, $4, TRUE, NOW())
         RETURNING "AdminId"`,
        [admin.fullName, admin.email, admin.password, admin.branchId ?? null]
    );

    const result = await pool.query(
        `SELECT A."AdminId", A."FullName", A."Email", A."BranchId", B."BranchName", A."IsActive", A."CreatedAt", A."UpdatedAt"
         FROM "Admins" A
         LEFT JOIN "Branches" B ON A."BranchId" = B."BranchId"
         WHERE A."AdminId" = $1`,
        [inserted.rows[0].AdminId]
    );

    return result.rows[0];

};

export const updateAdmin = async (admin) => {

    await pool.query(
        `UPDATE "Admins"
         SET "FullName" = $1, "Email" = $2, "BranchId" = $3, "IsActive" = $4, "UpdatedAt" = NOW()
         WHERE "AdminId" = $5`,
        [admin.fullName, admin.email, admin.branchId ?? null, admin.isActive, admin.adminId]
    );

    const result = await pool.query(
        `SELECT A."AdminId", A."FullName", A."Email", A."BranchId", B."BranchName", A."IsActive", A."CreatedAt", A."UpdatedAt"
         FROM "Admins" A
         LEFT JOIN "Branches" B ON A."BranchId" = B."BranchId"
         WHERE A."AdminId" = $1`,
        [admin.adminId]
    );

    return result.rows[0];

};

export const deactivateAdmin = async (adminId) => {

    const result = await pool.query(
        `UPDATE "Admins"
         SET "IsActive" = FALSE, "UpdatedAt" = NOW()
         WHERE "AdminId" = $1`,
        [adminId]
    );

    return { RowsAffected: result.rowCount };

};
