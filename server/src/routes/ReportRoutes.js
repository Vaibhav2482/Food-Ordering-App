import express from "express";
import { getDailySalesReport } from "../controllers/ReportController.js";

const router = express.Router();

router.get("/daily", getDailySalesReport);

export default router;