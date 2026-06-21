import express from "express";
import { getDashboardSummary,
  getRecentOrders,
  getTopSellingItems,
  getSalesLast7Days
 } from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/summary", getDashboardSummary);
router.get("/recent-orders", getRecentOrders);
router.get("/top-selling-items", getTopSellingItems);
router.get("/sales-last-7-days", getSalesLast7Days);



export default router;