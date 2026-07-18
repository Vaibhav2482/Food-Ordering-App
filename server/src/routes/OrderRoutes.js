import express from "express";

import {
    createOrder,
    getAllOrders,
    getActiveTableOrders,
    getOrderById,
    getOrdersByCustomer,
    updateOrderStatus,
    updateOrderItems,
    cancelOrder
} from "../controllers/OrderController.js";
import { authenticate, authorize } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, authorize("admin"), getAllOrders);
router.get("/active-by-table", authenticate, authorize("admin"), getActiveTableOrders);
router.get("/:id", authenticate, getOrderById);
router.get("/customer/:customerId", authenticate, getOrdersByCustomer);
router.put("/:id/status", authenticate, authorize("admin"), updateOrderStatus);
router.put("/:id/items", authenticate, authorize("admin"), updateOrderItems);
router.put("/:id/cancel", authenticate, cancelOrder);

export default router;