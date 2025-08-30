import express from "express";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { courseController } from "../controllers/course.controller.js";

const router = express.Router();

// Mentor buat kelas
router.post("/", authMiddleware, requireRole("MENTOR"), courseController.create );

// Semua user bisa lihat daftar kelas
router.get("/", authMiddleware, courseController.list);

// Detail kelas
router.get("/:id", authMiddleware, courseController.detail);

// Student join kelas pakai code
router.post("/join", authMiddleware, requireRole("STUDENT"), courseController.join);

export default router;
