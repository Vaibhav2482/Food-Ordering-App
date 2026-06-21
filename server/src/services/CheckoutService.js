import * as CheckoutRepository from "../repositories/CheckoutRepository.js";

export const checkout = async (checkoutData) => {

    const {
        customerId,
        addressId,
        paymentMethod,
        notes
    } = checkoutData;

    if (!customerId) {
        return {
            success: false,
            message: "Customer Id is required."
        };
    }

    if (!addressId) {
        return {
            success: false,
            message: "Address Id is required."
        };
    }

    if (!paymentMethod) {
        return {
            success: false,
            message: "Payment Method is required."
        };
    }

    const order = await CheckoutRepository.checkout(
        customerId,
        addressId,
        paymentMethod,
        notes
    );

    return {
        success: true,
        message: "Checkout completed successfully.",
        data: order
    };

};