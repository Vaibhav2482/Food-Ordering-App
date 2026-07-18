import sql from "../config/db.js";

// Get All Menu Items
export const getAllMenuItems = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId)
        .execute("sp_GetAllMenuItems");

    return result.recordset;
};

export const getMenuItemById = async (menuItemId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("MenuItemId", sql.Int, menuItemId)
        .execute("sp_GetMenuItemById");

    return result.recordset;
};

// Check Menu Item Exists
export const checkMenuItemExists = async (itemName, branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("ItemName", sql.NVarChar, itemName)
        .input("BranchId", sql.Int, branchId)
        .execute("sp_CheckMenuItemExists");

    return result.recordset;
};

// Create Menu Item
export const createMenuItem = async (menuItem) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, menuItem.branchId)
        .input("CategoryId", sql.Int, menuItem.categoryId)
        .input("ItemName", sql.NVarChar, menuItem.itemName)
        .input("Description", sql.NVarChar, menuItem.description)
        .input("Price", sql.Decimal(10, 2), menuItem.price)
        .input("ImageUrl", sql.NVarChar, menuItem.imageUrl)
        .input("IsAvailable", sql.Bit, menuItem.isAvailable)
        .input("IsPopular", sql.Bit, menuItem.isPopular)
        .input("IsActive", sql.Bit, menuItem.isActive)
        .execute("sp_CreateMenuItem");

    return result.recordset[0];
};

export const updateMenuItem = async (menuItem) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("MenuItemId", sql.Int, menuItem.menuItemId)
        .input("CategoryId", sql.Int, menuItem.categoryId)
        .input("ItemName", sql.NVarChar(300), menuItem.itemName)
        .input("Description", sql.NVarChar(2000), menuItem.description)
        .input("Price", sql.Decimal(10, 2), menuItem.price)
        .input("ImageUrl", sql.NVarChar(2000), menuItem.imageUrl)
        .input("IsAvailable", sql.Bit, menuItem.isAvailable)
        .input("IsPopular", sql.Bit, menuItem.isPopular)
        .input("IsActive", sql.Bit, menuItem.isActive)
        .execute("sp_UpdateMenuItem");

    return result.recordset[0];
};

export const getMenuItemByName = async (itemName, branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("ItemName", sql.NVarChar(300), itemName)
        .input("BranchId", sql.Int, branchId)
        .query(`
            SELECT *
            FROM dbo.MenuItems
            WHERE ItemName = @ItemName
              AND BranchId = @BranchId
        `);

    return result.recordset[0];
};

export const deleteMenuItem = async (menuItemId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("MenuItemId", sql.Int, menuItemId)
        .execute("sp_DeleteMenuItem");

    return result.recordset[0];
};
