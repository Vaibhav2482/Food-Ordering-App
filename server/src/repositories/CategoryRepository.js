import sql from "../config/db.js";

export const getAllCategories = async () => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .execute("sp_GetAllCategories");

    return result.recordset;
};

export const getCategoryById = async (categoryId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryId", sql.Int, categoryId)
        .execute("sp_GetCategoryById");

    return result.recordset;
};

export const checkCategoryExists = async (categoryName) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryName", sql.NVarChar, categoryName)
        .execute("sp_CheckCategoryExists");

    return result.recordset;
};

export const createCategory = async (category) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryName", sql.NVarChar, category.categoryName)
        .input("Description", sql.NVarChar, category.description)
        .input("ImageUrl", sql.NVarChar, category.imageUrl)
        .input("DisplayOrder", sql.Int, category.displayOrder)
        .execute("sp_CreateCategory");

    return result.recordset[0];
};

export const checkCategoryExistsForUpdate = async (categoryId, categoryName) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryId", sql.Int, categoryId)
        .input("CategoryName", sql.NVarChar, categoryName)
        .execute("sp_CheckCategoryExistsForUpdate");

    return result.recordset;
};

export const updateCategory = async (category) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryId", sql.Int, category.categoryId)
        .input("CategoryName", sql.NVarChar, category.categoryName)
        .input("Description", sql.NVarChar, category.description)
        .input("ImageUrl", sql.NVarChar, category.imageUrl)
        .input("DisplayOrder", sql.Int, category.displayOrder)
        .input("IsActive", sql.Bit, category.isActive)
        .execute("sp_UpdateCategory");

    return result.recordset[0];
};

export const deleteCategory = async (categoryId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CategoryId", sql.Int, categoryId)
        .execute("sp_DeleteCategory");

    return result.recordset[0];
};