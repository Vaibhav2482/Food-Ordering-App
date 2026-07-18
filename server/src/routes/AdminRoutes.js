import express from "express";
import {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deactivateAdmin
} from "../controllers/AdminController.js";
import { authenticate, requireOwner } from "../middleware/Auth.js";

const router = express.Router();

router.use(authenticate, requireOwner);

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deactivateAdmin);

export default router;
