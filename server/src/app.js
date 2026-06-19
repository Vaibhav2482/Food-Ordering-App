import express from "express";
import cors from "cors";

import AuthRoutes from "./routes/AuthRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";

import notFound from "./middleware/NotFound.js";
import errorHandler from "./middleware/ErrorHandler.js";

const app = express();

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

// Not Found Middleware
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;