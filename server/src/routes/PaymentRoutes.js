import express from "express";

import {
    createPayment,
    getPaymentByOrderId
} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/", createPayment);

router.get("/order/:orderId", getPaymentByOrderId);

export default router;