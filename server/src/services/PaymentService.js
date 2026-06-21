import * as paymentRepository from "../repositories/PaymentRepository.js";

export const createPayment = async (payment) => {

    return await paymentRepository.createPayment(payment);

};

export const getPaymentByOrderId = async (orderId) => {

    return await paymentRepository.getPaymentByOrderId(orderId);

};