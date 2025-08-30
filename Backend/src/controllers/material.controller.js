import { materialService } from "../services/material.service.js";

export const materialController = {
    upload: async (req, res) => {
        try {
            const { title, type, courseId } = req.body;
            const file = req.files?.file;

            const material = await materialService.uploadMaterial(
                { title, type, courseId },
                file
            );

            res.status(201).json({
                message: "Material uploaded successfully",
                data: material,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const materials = await materialService.getMaterials();
            res.json(materials);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getDetail: async (req, res) => {
        try {
            const { id } = req.params;
            const material = await materialService.getMaterialDetail(id);
            res.json(material);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, type, courseId } = req.body;
            const file = req.files?.file;

            const updatedMaterial = await materialService.update(
                id,
                { title, type, courseId },
                file
            );

            res.json({
                message: "Material updated successfully",
                data: updatedMaterial,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await materialService.delete(id);

            res.json({ message: "Material deleted successfully" });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};
