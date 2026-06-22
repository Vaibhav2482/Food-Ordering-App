import express from "express";
import {
    registerCustomer,
    customerLogin,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../controllers/CustomerController.js";

const router = express.Router();

router.post("/register", registerCustomer);

router.post("/login", customerLogin);

router.get("/", getAllCustomers);

router.get("/:id", getCustomerById);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;