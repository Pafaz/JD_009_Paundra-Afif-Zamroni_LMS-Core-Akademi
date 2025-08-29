import prisma from "../utils/prisma.js";

export const feedbackRepository = {
    create: async (data) => {
        return await prisma.feedback.create({ data });
    },

    findAll: async () => {
        return await prisma.feedback.findMany({
            include: { user: true },
            orderBy: { id: "desc" },
        });
    },

    findById: async (id) => {
        return await prisma.feedback.findUnique({
            where: { id },
            include: { user: true },
        });
    },

    delete: async (id) => {
        return await prisma.feedback.delete({ where: { id } });
    },
};
