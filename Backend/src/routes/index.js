import { Router } from "express";
import authRoutes from "./auth.routes.js";
import classRoutes from "./class.routes.js";
import materialRoutes from "./material.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/class", classRoutes);
router.use("/material", materialRoutes);

export default router;
