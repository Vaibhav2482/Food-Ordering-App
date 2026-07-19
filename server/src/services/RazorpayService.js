import crypto from "crypto";
import Razorpay from "razorpay";
import * as OrderRepository from "../repositories/OrderRepository.js";
import * as PaymentRepository from "../repositories/PaymentRepository.js";

let razorpayInstance = null;

const getRazorpayInstance = () => {

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.");
    }

    if (!razorpayInstance) {

        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

    }

    return razorpayInstance;

};

export const createRazorpayOrder = async (orderId) => {

    const orderRows = await OrderRepository.getOrderById(orderId);

    if (!orderRows || orderRows.length === 0) {
        return { success: false, message: "Order not found." };
    }

    const order = orderRows[0];

    const amountInPaise = Math.round(Number(order.TotalAmount) * 100);

    // Razorpay rejects orders under ₹1 (100 paise); fail with a clear
    // message instead of surfacing their generic API error.
    if (amountInPaise < 100) {
        return {
            success: false,
            message: "Order amount must be at least ₹1 to pay online."
        };
    }

    const razorpayOrder = await getRazorpayInstance().orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `order_${order.OrderId}`,
        notes: { orderId: String(order.OrderId) }
    });

    return {
        success: true,
        message: "Razorpay order created successfully.",
        data: {
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        }
    };

};

export const verifyRazorpayPayment = async ({

    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature

}) => {

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return { success: false, message: "Missing payment verification details." };
    }

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

    const isValid =
        expectedSignature.length === razorpaySignature.length &&
        crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpaySignature));

    if (!isValid) {
        return { success: false, message: "Payment verification failed." };
    }

    const orderRows = await OrderRepository.getOrderById(orderId);

    if (!orderRows || orderRows.length === 0) {
        return { success: false, message: "Order not found." };
    }

    const order = orderRows[0];

    const payment = await PaymentRepository.createPayment({
        orderId: order.OrderId,
        paymentMethod: order.PaymentMethod,
        amount: order.TotalAmount,
        paymentStatus: "Success",
        transactionId: razorpayPaymentId
    });

    return {
        success: true,
        message: "Payment verified successfully.",
        data: payment
    };

};
