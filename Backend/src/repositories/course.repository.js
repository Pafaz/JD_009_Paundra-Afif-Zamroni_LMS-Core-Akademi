import prisma from "../utils/prisma.js";

export const courseRepository = {
    create: async (data) => {
        return prisma.course.create({ data });
    },

    update: async (id, data) => {
        return prisma.course.update({
            where: { id },
            data,
        });
    },

    findByCode: async (code) => {
        return prisma.course.findUnique({ where: { code } });
    },

    findById: async (id) => {
        return prisma.course.findUnique({ where: { id }, include: { students: true } });
    },

    addStudent: async (courseId, studentId) => {
        return prisma.course.update({
            where: { id: courseId },
            data: {
                students: {
                    connect: { id: studentId },
                },
            },
        });
    },

    list: async () => {
        return prisma.course.findMany({ include: {  students: true } });
    },
};
