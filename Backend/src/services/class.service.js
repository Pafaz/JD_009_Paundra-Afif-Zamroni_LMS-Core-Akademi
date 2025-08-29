import { classRepository } from "../repositories/class.repository.js";

export const classService = {
    createClass: async ( name) => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        return classRepository.create({
            name,
            code,
        });
    },

    joinClass: async (studentId, code) => {
        const cls = await classRepository.findByCode(code);
        if (!cls) {
            throw new Error("Class not found");
        }
        return classRepository.addStudent(cls.id, studentId);
    },

    getClassDetail: async (id) => {
        const cls = await classRepository.findById(id);
        if (!cls) {
            throw new Error("Class not found");
        }
        return cls;
    },

    listClasses: async () => {
        return classRepository.list();
    },
};
