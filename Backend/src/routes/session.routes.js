import { Router } from "express";
import { sessionController } from "../controllers/session.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, sessionController.create);
router.get("/mentor/:mentorId", authMiddleware, requireRole("MENTOR") ,sessionController.getByMentor);
router.get("/student/:studentId", authMiddleware, requireRole("STUDENT") ,sessionController.getByStudent);
router.patch("/:id/status", authMiddleware, sessionController.updateStatus);

export default router;
