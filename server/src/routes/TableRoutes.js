import express from "express";
import {
    getActiveTables,
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deactivateTable
} from "../controllers/TableController.js";
import { authenticate, authorize } from "../middleware/Auth.js";

const router = express.Router();

router.get("/active", authenticate, authorize("admin"), getActiveTables);

router.get("/", authenticate, authorize("admin"), getAllTables);
router.get("/:id", authenticate, authorize("admin"), getTableById);
router.post("/", authenticate, authorize("admin"), createTable);
router.put("/:id", authenticate, authorize("admin"), updateTable);
router.delete("/:id", authenticate, authorize("admin"), deactivateTable);

export default router;
