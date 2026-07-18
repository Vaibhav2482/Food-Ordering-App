import sql from "../config/db.js";

export const createOrder = async (order) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, order.customerId)
        .input("AddressId", sql.Int, order.addressId ?? null)
        .input("DeliveryType", sql.NVarChar(20), order.deliveryType ?? "Delivery")
        .input("PaymentMethod", sql.NVarChar(100), order.paymentMethod)
        .input("Notes", sql.NVarChar(2000), order.notes ?? null)
        .input("Items", sql.NVarChar(sql.MAX), JSON.stringify(order.items))
        .input("TableNumber", sql.NVarChar(20), order.tableNumber ?? null)
        .execute("sp_CreateOrder");

    return result.recordset[0];

};

export const getActiveTableOrders = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId)
        .execute("sp_GetActiveTableOrders");

    return result.recordset;

};

export const getAllOrders = async (branchId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("BranchId", sql.Int, branchId ?? null)
        .execute("sp_GetAllOrders");

    return result.recordset;

};

export const getOrderById = async (orderId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, orderId)
        .execute("sp_GetOrderById");

    return result.recordset;

};

export const getOrdersByCustomer = async (customerId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_GetOrdersByCustomer");

    return result.recordset;

};

export const updateOrderStatus = async (id, orderStatus) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, id)
        .input("OrderStatus", sql.NVarChar(50), orderStatus)
        .execute("sp_UpdateOrderStatus");

    return result.recordset[0];

};

export const updateOrderItems = async (orderId, items) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, orderId)
        .input("Items", sql.NVarChar(sql.MAX), JSON.stringify(items))
        .execute("sp_UpdateOrderItems");

    return result.recordset[0];

};

export const cancelOrder = async (orderId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, orderId)
        .execute("sp_CancelOrder");

    return result.recordset[0];

};