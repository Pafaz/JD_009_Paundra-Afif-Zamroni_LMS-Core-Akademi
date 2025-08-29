import { feedbackRepository } from "../repositories/feedback.repository.js";
import { createFeedbackSchema } from "../validations/feedback.validation.js";

export const feedbackService = {
    createFeedback: async (data) => {
        const parsed = createFeedbackSchema.parse(data);
        return await feedbackRepository.create(parsed);
    },

    getAllFeedback: async () => {
        return await feedbackRepository.findAll();
    },

    getFeedbackById: async (id) => {
        const feedback = await feedbackRepository.findById(id);
        if (!feedback) throw new Error("Feedback not found");
        return feedback;
    },

    deleteFeedback: async (id) => {
        const feedback = await feedbackRepository.findById(id);
        if (!feedback) throw new Error("Feedback not found");
        return await feedbackRepository.delete(id);
    },
};
