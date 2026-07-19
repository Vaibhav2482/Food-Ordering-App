import pool from "../config/db.js";

export const getAllCategories = async () => {

    const result = await pool.query(`
        SELECT "CategoryId", "CategoryName", "Description", "ImageUrl", "DisplayOrder", "IsActive"
        FROM "Categories"
        ORDER BY "DisplayOrder"
    `);

    return result.rows;
};

export const getCategoryById = async (categoryId) => {

    const result = await pool.query(
        `SELECT "CategoryId", "CategoryName", "Description", "ImageUrl", "DisplayOrder", "IsActive"
         FROM "Categories"
         WHERE "CategoryId" = $1`,
        [categoryId]
    );

    return result.rows;
};

export const checkCategoryExists = async (categoryName) => {

    const result = await pool.query(
        `SELECT "CategoryId"
         FROM "Categories"
         WHERE "CategoryName" = $1 AND "IsActive" = TRUE`,
        [categoryName]
    );

    return result.rows;
};

export const createCategory = async (category) => {

    const result = await pool.query(
        `INSERT INTO "Categories" ("CategoryName", "Description", "ImageUrl", "DisplayOrder", "IsActive", "CreatedAt", "UpdatedAt")
         VALUES ($1, $2, $3, $4, TRUE, NOW(), NOW())
         RETURNING "CategoryId"`,
        [category.categoryName, category.description, category.imageUrl, category.displayOrder]
    );

    return result.rows[0];
};

export const checkCategoryExistsForUpdate = async (categoryId, categoryName) => {

    const result = await pool.query(
        `SELECT "CategoryId"
         FROM "Categories"
         WHERE "CategoryName" = $1 AND "CategoryId" <> $2 AND "IsActive" = TRUE`,
        [categoryName, categoryId]
    );

    return result.rows;
};

export const updateCategory = async (category) => {

    const result = await pool.query(
        `UPDATE "Categories"
         SET "CategoryName" = $1, "Description" = $2, "ImageUrl" = $3, "DisplayOrder" = $4, "IsActive" = $5, "UpdatedAt" = NOW()
         WHERE "CategoryId" = $6`,
        [category.categoryName, category.description, category.imageUrl, category.displayOrder, category.isActive, category.categoryId]
    );

    return { RowsAffected: result.rowCount };
};

export const deleteCategory = async (categoryId) => {

    const result = await pool.query(
        `DELETE FROM "Categories" WHERE "CategoryId" = $1`,
        [categoryId]
    );

    return { RowsAffected: result.rowCount };
};
