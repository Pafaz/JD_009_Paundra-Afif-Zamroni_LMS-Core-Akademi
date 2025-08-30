import { courseRepository } from "../repositories/course.repository.js";

export const courseService = {
    createCourse: async (data) => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        return courseRepository.create({
            title: data.title,
            description: data.description,
            difficulty: data.difficulty,
            durationWeeks: data.durationWeeks,
            price: data.price,
            image: data.image,
            code: `CA-${code}`,
        });
    },

    updateCourse: async (id, data) => {
        return courseRepository.update({
            id,
            title: data.title,
            description: data.description,
            difficulty: data.difficulty,
            durationWeeks: data.durationWeeks,
            price: data.price,
            image: data.image,
        });
    },

    joinCourse: async (studentId, code) => {
        const cls = await courseRepository.findByCode(code);
        if (!cls) {
            throw new Error("course not found");
        }
        return courseRepository.addStudent(cls.id, studentId);
    },

    getCourseDetail: async (id) => {
        const cls = await courseRepository.findById(id);
        if (!cls) {
            throw new Error("course not found");
        }
        return cls;
    },

    listCourses: async () => {
        return courseRepository.list();
    },
};
