import express from "express";
import { feedbackController } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/", feedbackController.create);
router.get("/", feedbackController.list);
router.get("/:id", feedbackController.detail);
router.delete("/:id", feedbackController.delete);

export default router;
