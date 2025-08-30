import prisma from "../utils/prisma.js";

export const materialRepository = {
    create: async (data) => {
        return await prisma.material.create({
            data: {
                title: data.title,
                type: data.type,  
                url: data.url,     
                courseId: data.courseId,
            },
        });
    },

    findAll: async () => {
        return await prisma.material.findMany({
            include: {
                course: true,
            },
        });
    },

    findById: async (id) => {
        return await prisma.material.findUnique({
            where: { id: Number(id) },
            include: {
                course: true,
            },
        });
    },

    update: async (id, data) => {
        return await prisma.material.update({
            where: { id: Number(id) },
            data: {
                title: data.title,
                type: data.type,
                url: data.url,
                courseId: data.courseId,
            },
        });
    },

    delete: async (id) => {
        return await prisma.material.delete({
            where: { id: Number(id) },
        });
    },
};
