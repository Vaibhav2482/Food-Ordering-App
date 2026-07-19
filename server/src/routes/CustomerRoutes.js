import express from "express";
import {
    registerCustomer,
    customerLogin,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    findOrCreateWalkInCustomer,
    getOrCreateGuestCustomer,
    sendOtp,
    verifyOtp
} from "../controllers/CustomerController.js";
import { authenticate, authorize } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", registerCustomer);

router.post("/login", customerLogin);

router.post("/otp/send", sendOtp);

router.post("/otp/verify", verifyOtp);

router.post("/walk-in", authenticate, authorize("admin"), findOrCreateWalkInCustomer);

router.post("/guest", authenticate, authorize("admin"), getOrCreateGuestCustomer);

router.get("/", authenticate, authorize("admin"), getAllCustomers);

router.get("/:id", authenticate, getCustomerById);

router.put("/:id", authenticate, updateCustomer);

router.delete("/:id", authenticate, authorize("admin"), deleteCustomer);

export default router;