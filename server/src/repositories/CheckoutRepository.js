import * as CartRepository from "./CartRepository.js";
import * as OrderRepository from "./OrderRepository.js";

export const checkout = async (
    customerId,
    addressId,
    deliveryType,
    paymentMethod,
    notes
) => {

    // Step 1
    const cartItems = await CartRepository.getCart(customerId);

    if (cartItems.length === 0) {
        throw new Error("Cart is empty.");
    }

    // Step 2
    const items = cartItems.map(item => ({
        menuItemId: item.MenuItemId,
        quantity: item.Quantity
    }));

    // Step 3
    const order = await OrderRepository.createOrder({
        customerId,
        addressId,
        deliveryType,
        paymentMethod,
        notes,
        items
    });

    // Step 4
    await CartRepository.clearCart(customerId);

    return order;
};