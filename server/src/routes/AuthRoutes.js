import express from "express";
import { adminLogin } from "../controllers/AuthController.js";

const router = express.Router();

// Admin Login
router.post("/admin/login", adminLogin);

export default router;