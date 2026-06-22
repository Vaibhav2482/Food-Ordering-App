import express from "express";

import {

    getDailySalesReport,
    getWeeklySalesReport,
    getMonthlySalesReport,
    getCustomDateSalesReport

} from "../controllers/ReportController.js";

const router = express.Router();

router.get(

    "/daily",

    getDailySalesReport

);

router.get(

    "/weekly",

    getWeeklySalesReport

);

router.get(

    "/monthly",

    getMonthlySalesReport

);

router.get(

    "/custom",

    getCustomDateSalesReport

);

export default router;