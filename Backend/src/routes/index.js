import { Router } from "express";
import authRoutes from "./auth.routes.js";
import classRoutes from "./class.routes.js";
import materialRoutes from "./material.routes.js";
import feedBackRoutes from "./feedback.routes.js";
import sessionRoutes from "./session.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/class", classRoutes);
router.use("/material", materialRoutes);
router.use("/feedback", feedBackRoutes);
router.use("/session", sessionRoutes);

export default router;
