import express from "express";
import { 
  registerCustomer,
  customerLogin,
  getCustomerById,
  updateCustomer
 } from "../controllers/CustomerController.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", customerLogin);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);

export default router;