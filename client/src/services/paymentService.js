import axiosClient from "../api/axiosClient";

/**
 * Records a payment for methods with no online gateway step (e.g. Cash on Delivery) —
 * just logs a Pending payment against the order.
 */
export const confirmPayment = async ({ orderId, paymentMethod, amount }) => {

    const response = await axiosClient.post("/payments", {
        orderId,
        paymentMethod,
        amount
    });

    return response.data;

};

export const getPaymentByOrderId = async (orderId) => {

    const response = await axiosClient.get(`/payments/order/${orderId}`);

    return response.data;

};

export const getPaymentsByCustomer = async (customerId) => {

    const response = await axiosClient.get(`/payments/customer/${customerId}`);

    return response.data;

};

export const createRazorpayOrder = async (orderId) => {

    const response = await axiosClient.post("/payments/razorpay/create-order", { orderId });

    return response.data;

};

export const verifyRazorpayPayment = async ({ orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {

    const response = await axiosClient.post("/payments/razorpay/verify", {
        orderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
    });

    return response.data;

};
