import express from "express";

import {
    createPayment,
    getPaymentByOrderId,
    getPaymentsByCustomer,
    createRazorpayOrder,
    verifyRazorpayPayment
} from "../controllers/PaymentController.js";
import { authenticate } from "../middleware/Auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createPayment);

router.get("/order/:orderId", getPaymentByOrderId);

router.get("/customer/:customerId", getPaymentsByCustomer);

router.post("/razorpay/create-order", createRazorpayOrder);

router.post("/razorpay/verify", verifyRazorpayPayment);

export default router;