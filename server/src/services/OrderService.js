import * as OrderRepository from "../repositories/OrderRepository.js";
import * as MenuRepository from "../repositories/MenuRepository.js";

const VALID_DELIVERY_TYPES = ["Delivery", "Dine In", "Takeaway"];

export const createOrder = async (order, restrictToBranchId) => {

    const deliveryType = order.deliveryType || "Delivery";

    if (!order.customerId) {
        return {
            success: false,
            message: "Customer Id is required."
        };
    }

    if (!VALID_DELIVERY_TYPES.includes(deliveryType)) {
        return {
            success: false,
            message: "Order type must be Delivery, Dine In or Takeaway."
        };
    }

    if (deliveryType === "Delivery" && !order.addressId) {
        return {
            success: false,
            message: "Address Id is required for delivery orders."
        };
    }

    if (deliveryType === "Dine In" && (!order.tableNumber || String(order.tableNumber).trim() === "")) {
        return {
            success: false,
            message: "Table number is required for dine-in orders."
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

        if (restrictToBranchId) {

            const menuItem = await MenuRepository.getMenuItemById(item.menuItemId);

            if (!menuItem || menuItem.length === 0 || String(menuItem[0].BranchId) !== String(restrictToBranchId)) {
                return {
                    success: false,
                    message: "You can only place orders using your own branch's menu."
                };
            }

        }

    }

    const createdOrder = await OrderRepository.createOrder({
        ...order,
        deliveryType,
        addressId: deliveryType === "Delivery" ? order.addressId : null,
        tableNumber: deliveryType === "Dine In" ? order.tableNumber : null
    });

    return {
        success: true,
        message: "Order created successfully.",
        data: createdOrder
    };

};

export const getActiveTableOrders = async (branchId) => {

    if (!branchId) {
        return {
            success: false,
            message: "Branch Id is required."
        };
    }

    const orders = await OrderRepository.getActiveTableOrders(branchId);

    return {
        success: true,
        message: "Active table orders fetched successfully.",
        data: orders
    };

};

export const getAllOrders = async (branchId) => {

    const orders = await OrderRepository.getAllOrders(branchId);

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

export const updateOrderItems = async (orderId, items) => {

    if (!items || !Array.isArray(items) || items.length === 0) {
        return {
            success: false,
            message: "Order must contain at least one item."
        };
    }

    for (const item of items) {

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

    const existingOrder = await OrderRepository.getOrderById(orderId);

    if (existingOrder.length === 0) {
        return {
            success: false,
            message: "Order not found."
        };
    }

    if (existingOrder[0].OrderStatus !== "Pending") {
        return {
            success: false,
            message: "Only pending orders can have their items edited."
        };
    }

    const updatedOrder = await OrderRepository.updateOrderItems(orderId, items);

    return {
        success: true,
        message: "Order items updated successfully.",
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