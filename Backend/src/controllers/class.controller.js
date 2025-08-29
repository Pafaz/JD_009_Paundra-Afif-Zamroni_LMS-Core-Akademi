import { classService } from "../services/class.service.js";

export const classController = {
    create: async (req, res) => {
        try {
            const { name } = req.body;
            const newClass = await classService.createClass(name);
            res.json({message: "Class created", newClass});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    join: async (req, res) => {
        try {
            const { code } = req.body;
            const studentId = req.user.id;
            const updatedClass = await classService.joinClass(studentId, code);
            res.json({message: "Class joined", updatedClass});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const cls = await classService.getClassDetail(parseInt(id));
            res.json({message: "Class found", cls});
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },

    list: async (req, res) => {
        try {
            const classes = await classService.listClasses();
            res.json({message: "Classes found", classes});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
