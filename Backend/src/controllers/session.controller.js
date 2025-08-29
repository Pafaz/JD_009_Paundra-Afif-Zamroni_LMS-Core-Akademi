import { sessionService } from "../services/session.service.js";

export const sessionController = {
    create: async (req, res) => {
        try {
            const session = await sessionService.create(req.body);
            res.json({ message: "Session created", session });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    getByStudent: async (req, res) => {
        try {
            const sessions = await sessionService.getByStudent(req.user.id);
            res.json({ message: "Sessions found", sessions });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    getByMentor: async (req, res) => {
        try {
            const sessions = await sessionService.getByMentor(req.user.id);
            res.json({ message: "Sessions found", sessions });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const session = await sessionService.update(id, req.body);
            res.json({ message: "Session updated", session });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
