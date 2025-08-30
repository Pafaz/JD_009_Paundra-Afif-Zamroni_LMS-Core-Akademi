import { materialRepository } from "../repositories/material.repository.js";
import path from "path";
import fs from "fs";

export const materialService = {
    uploadMaterial: async (data, file) => {
        if (!file) {
            throw new Error("File is required (PDF or PPT)");
        }

        // Pastikan folder materials ada
        const uploadDir = path.join(process.cwd(), "public", "materials");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Nama unik untuk file
        const fileName = Date.now() + "-" + file.name;
        const uploadPath = path.join(uploadDir, fileName);

        // Simpan file
        await file.mv(uploadPath);

        return await materialRepository.create({
            title: data.title,
            type: data.type.toUpperCase(),
            url: `/public/materials/${fileName}`,
            courseId: data.courseId,
        });
    },

    getMaterials: async () => {
        return await materialRepository.findAll();
    },

    getMaterialDetail: async (id) => {
        const material = await materialRepository.findById(id);
        if (!material) throw new Error("Material not found");
        return material;
    },

    update: async (id, data, file) => {
        const material = await materialRepository.findById(id);
        if (!material) throw new Error("Material not found");

        let updateData = {
            title: data.title,
            type: data.type.toUpperCase(),
            courseId: data.courseId,
        };

        if (file) {
            // Pastikan folder materials ada
            const uploadDir = path.join(process.cwd(), "public", "materials");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Hapus file lama
            const oldFilePath = path.join(process.cwd(), material.url);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }

            // Simpan file baru
            const fileName = Date.now() + "-" + file.name;
            const uploadPath = path.join(uploadDir, fileName);
            await file.mv(uploadPath);

            updateData.url = `/public/materials/${fileName}`;
        }

        return await materialRepository.update(id, updateData);
    },

    delete: async (id) => {
        const material = await materialRepository.findById(id);
        if (!material) throw new Error("Material not found");

        // Hapus file fisik
        const filePath = path.join(process.cwd(), material.url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return await materialRepository.delete(id);
    },
};
