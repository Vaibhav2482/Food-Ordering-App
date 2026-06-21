import sql from "../config/db.js";

export const addToCart = async (cart) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, cart.customerId)
        .input("MenuItemId", sql.Int, cart.menuItemId)
        .input("Quantity", sql.Int, cart.quantity)
        .execute("sp_AddToCart");

    return result.recordset[0];

};

export const getCart = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_GetCart");

    return result.recordset;

};

export const updateCartQuantity = async (cartId, quantity) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CartId", sql.Int, cartId)
        .input("Quantity", sql.Int, quantity)
        .execute("sp_UpdateCartQuantity");

    return result.recordset[0];

};

export const removeCartItem = async (cartId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CartId", sql.Int, cartId)
        .execute("sp_RemoveCartItem");

    return result.recordset[0];

};

export const clearCart = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_ClearCart");

    return result.recordset[0];

};