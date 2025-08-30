import { courseService } from "../services/course.service.js";

export const courseController = {
    create: async (req, res) => {
        try {
            const newcourse = await courseService.createCourse(req.body);
            res.json({message: "course created", newcourse});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    join: async (req, res) => {
        try {
            const { code } = req.body;
            const studentId = req.user.id;
            const updatedCourse = await courseService.joinCourse(studentId, code);
            res.json({message: "course joined", updatedCourse});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const cls = await courseService.getCourseDetail(parseInt(id));
            res.json({message: "course found", cls});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    list: async (req, res) => {
        try {
            const courses = await courseService.listCourses();
            res.json(courses);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
