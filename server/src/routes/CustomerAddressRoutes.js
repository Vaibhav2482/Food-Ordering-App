import express from "express";
import { createCustomerAddress } from "../controllers/CustomerAddressController.js";

const router = express.Router();

router.post("/", createCustomerAddress);

export default router;