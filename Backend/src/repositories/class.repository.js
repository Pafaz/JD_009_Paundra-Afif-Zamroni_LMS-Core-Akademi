import prisma from "../utils/prisma.js";

export const classRepository = {
    create: async (data) => {
        return prisma.class.create({ data });
    },

    findByCode: async (code) => {
        return prisma.class.findUnique({ where: { code } });
    },

    findById: async (id) => {
        return prisma.class.findUnique({ where: { id }, include: { students: true } });
    },

    addStudent: async (classId, studentId) => {
        return prisma.class.update({
            where: { id: classId },
            data: {
                students: {
                    connect: { id: studentId },
                },
            },
        });
    },

    list: async () => {
        return prisma.class.findMany({ include: {  students: true } });
    },
};
