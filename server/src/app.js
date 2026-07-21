import express from "express";
import cors from "cors";

import AuthRoutes from "./routes/AuthRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";

import notFound from "./middleware/NotFound.js";
import errorHandler from "./middleware/ErrorHandler.js";

import MenuRoutes from "./routes/MenuRoutes.js";
import CustomerRoutes from "./routes/CustomerRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
const app = express();
import CustomerAddressRoutes from "./routes/CustomerAddressRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import CheckoutRoutes from "./routes/CheckoutRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import DashboardRoutes from "./routes/DashboardRoutes.js";
import ReportRoutes from "./routes/ReportRoutes.js";
import BranchRoutes from "./routes/BranchRoutes.js";
import TableRoutes from "./routes/TableRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import { swaggerDocs } from "./config/swagger.js";











// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully."
    });
});

// API Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/categories", CategoryRoutes);
app.use("/api/v1/menu", MenuRoutes);
app.use("/api/v1/customers", CustomerRoutes);
app.use("/api/v1/orders", OrderRoutes);
app.use("/api/v1/customer-addresses", CustomerAddressRoutes);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/checkout", CheckoutRoutes);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/dashboard", DashboardRoutes);
app.use("/api/v1/reports", ReportRoutes);
app.use("/api/v1/branches", BranchRoutes);
app.use("/api/v1/tables", TableRoutes);
app.use("/api/v1/admins", AdminRoutes);
app.use("/api/v1/uploads", UploadRoutes);


swaggerDocs(app);







// Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;