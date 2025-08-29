import prisma from "../utils/prisma.js";

export const sessionRepository = {
    create: async (data) => {
        return await prisma.session.create({ data });
    },
    update: async (id, data) => {
        return await prisma.session.update({
            where: { id: Number(id) },
            data: data,
        });
    },
    delete: async (id) => {
        return await prisma.session.delete({
            where: { id: Number(id) },
        });
    },
    findById: async (id) => {
        return await prisma.session.findUnique({
            where: { id: Number(id) },
        });
    },
    findByStudent: async (studentId) => {
        return await prisma.session.findMany({
            where: { studentId: Number(studentId), include: { mentor: true } },
        });
    },
    findByMentor: async (mentorId) => {
        return await prisma.session.findMany({
            where: { mentorId: Number(mentorId), include: { student: true } },
        });
    },
};