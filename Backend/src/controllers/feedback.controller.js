import { feedbackService } from "../services/feedback.service.js";

export const feedbackController = {
    create: async (req, res) => {
        try {
            const feedback = await feedbackService.createFeedback({
                content: req.body.content,
                userId: req.body.userId,
            });
            res.status(201).json({ message: "Feedback created", feedback });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    list: async (req, res) => {
        try {
            const feedbacks = await feedbackService.getAllFeedback();
            res.json({ message: "Feedbacks found", feedbacks });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    detail: async (req, res) => {
        try {
            const feedback = await feedbackService.getFeedbackById(parseInt(req.params.id));
            res.json({ message: "Feedback found", feedback });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            await feedbackService.deleteFeedback(parseInt(req.params.id));
            res.json({ message: "Feedback deleted" });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};
