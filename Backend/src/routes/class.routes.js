import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { classController } from "../controllers/class.controller.js";

const router = express.Router();

// Mentor buat kelas
router.post("/", authMiddleware, requireRole("MENTOR"), classController.create );

// Semua user bisa lihat daftar kelas
router.get("/", authMiddleware, classController.list);

// Detail kelas
router.get("/:id", authMiddleware, classController.detail);

// Student join kelas pakai code
router.post("/join", authMiddleware, requireRole("STUDENT"), classController.join);

export default router;
