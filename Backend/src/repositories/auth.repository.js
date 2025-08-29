import prisma from "../utils/prisma.js";

export const authRepository = {
    findUserByEmail: async (email) => {
        return await prisma.user.findUnique({ where: { email } });
    },
    createUser : async (data) => { return await prisma.user.create({data}) },
};

