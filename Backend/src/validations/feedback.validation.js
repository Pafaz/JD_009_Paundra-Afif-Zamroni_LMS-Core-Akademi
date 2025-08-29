import { z } from "zod";

export const createFeedbackSchema = z.object({
    content: z.string().min(1, "Content is required"),
    userId: z.number().min(1, "User ID is required"),
});
