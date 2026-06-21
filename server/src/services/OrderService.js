import * as OrderRepository from "../repositories/OrderRepository.js";

export const createOrder = async (order) => {

    if (!order.customerId) {
        return {
            success: false,
            message: "Customer Id is required."
        };
    }

    if (!order.addressId) {
        return {
            success: false,
            message: "Address Id is required."
        };
    }

    if (!order.paymentMethod || order.paymentMethod.trim() === "") {
        return {
            success: false,
            message: "Payment Method is required."
        };
    }

    if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
        return {
            success: false,
            message: "Order must contain at least one item."
        };
    }

    for (const item of order.items) {

        if (!item.menuItemId) {
            return {
                success: false,
                message: "Menu Item Id is required."
            };
        }

        if (!item.quantity || item.quantity <= 0) {
            return {
                success: false,
                message: "Quantity must be greater than zero."
            };
        }

    }

    const createdOrder = await OrderRepository.createOrder(order);

    return {
        success: true,
        message: "Order created successfully.",
        data: createdOrder
    };


    
};

export const getAllOrders = async () => {

    const orders = await OrderRepository.getAllOrders();

    return {
        success: true,
        message: "Orders fetched successfully.",
        data: orders
    };

};

export const getOrderById = async (orderId) => {

    const order = await OrderRepository.getOrderById(orderId);

    if (order.length === 0) {
        return {
            success: false,
            message: "Order not found."
        };
    }

    return {
        success: true,
        message: "Order fetched successfully.",
        data: order
    };

};

export const getOrdersByCustomer = async (customerId) => {

    const orders = await OrderRepository.getOrdersByCustomer(customerId);

    if (orders.length === 0) {
        return {
            success: false,
            message: "No orders found for this customer."
        };
    }

    return {
        success: true,
        message: "Orders fetched successfully.",
        data: orders
    };

};

export const updateOrderStatus = async (orderId, orderStatus) => {

    if (!orderStatus || orderStatus.trim() === "") {
        return {
            success: false,
            message: "Order Status is required."
        };
    }

    const existingOrder = await OrderRepository.getOrderById(orderId);

    if (existingOrder.length === 0) {
        return {
            success: false,
            message: "Order not found."
        };
    }

    const updatedOrder = await OrderRepository.updateOrderStatus(
        orderId,
        orderStatus
    );

    return {
        success: true,
        message: "Order status updated successfully.",
        data: updatedOrder
    };

};

export const cancelOrder = async (orderId) => {

    const existingOrder = await OrderRepository.getOrderById(orderId);

    if (existingOrder.length === 0) {
        return {
            success: false,
            message: "Order not found."
        };
    }

    const cancelledOrder = await OrderRepository.cancelOrder(orderId);

    return {
        success: true,
        message: "Order cancelled successfully.",
        data: cancelledOrder
    };

};