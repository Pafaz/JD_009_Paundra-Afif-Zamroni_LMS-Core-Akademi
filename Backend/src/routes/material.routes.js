import express from "express";
import { materialController } from "../controllers/material.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("MENTOR") ,materialController.upload);
router.get("/", authMiddleware, materialController.getAll);
router.get("/:id", authMiddleware, materialController.getDetail);
router.put("/:id", authMiddleware, requireRole("MENTOR") ,materialController.update);
router.delete("/:id", authMiddleware, requireRole("MENTOR") , materialController.delete);

export default router;
