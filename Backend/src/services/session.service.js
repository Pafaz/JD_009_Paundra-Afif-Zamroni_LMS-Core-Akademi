import { createSessionSchema, updateSessionSchema } from "../validations/session.validation.js";
import { sessionRepository } from "../repositories/session.repository.js";
import { authRepository } from "../repositories/auth.repository.js";

export const sessionService = {
    create: async (data) => {
        const parsed = createSessionSchema.parse(data);

        const existing = await sessionRepository.findById(parsed.id);
        if (existing) throw new Error("Session already exists");

        return await sessionRepository.create(parsed);
    },

    update: async (id, data) => {
        const parsed = updateSessionSchema.parse({ id, ...data });

        const session = await sessionRepository.findById(parsed.id);
        if (!session) throw new Error("Session not found");

        if (parsed.status === "REJECTED") {
            return await sessionRepository.update(parsed.id, {
                ...parsed,
                deleted_at: new Date()
            });
        }

        return await sessionRepository.update(parsed.id, parsed);
    },

    getByStudent: async (studentId) => {
        const student = await authRepository.findById(studentId);
        if (!student) throw new Error("Student not found");

        return await sessionRepository.findByStudent(studentId);
    },

    getByMentor: async (mentorId) => {
        const mentor = await authRepository.findById(mentorId);
        if (!mentor) throw new Error("Mentor not found");

        return await sessionRepository.findByMentor(mentorId);
    },

    hardDelete: async (id) => {
        const session = await sessionRepository.findById(parsed.id);
        if (!session) throw new Error("Session not found");

        if (session.status === "REJECTED") {
            throw new Error("Cannot delete rejected session manually");
        }

        return await sessionRepository.delete(id);
    },
};
