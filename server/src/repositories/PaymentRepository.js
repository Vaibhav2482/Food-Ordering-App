import sql from "../config/db.js";

export const createPayment = async (payment) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, payment.orderId)
        .input("PaymentMethod", sql.NVarChar(50), payment.paymentMethod)
        .input("Amount", sql.Decimal(10, 2), payment.amount)
        .input("PaymentStatus", sql.NVarChar(20), payment.paymentStatus ?? "Pending")
        .input("TransactionId", sql.NVarChar(150), payment.transactionId ?? null)
        .execute("sp_CreatePayment");

    return result.recordset[0];

};

export const getPaymentByOrderId = async (orderId) => {

    const pool = await sql.connect();

    const result = await pool
        .request()
        .input("OrderId", sql.Int, orderId)
        .execute("sp_GetPaymentByOrderId");

    return result.recordset;

};