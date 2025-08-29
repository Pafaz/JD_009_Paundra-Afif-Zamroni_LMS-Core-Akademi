import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";
import './cron/cleanUpRejectedSession.js';
import { fileURLToPath } from "url"; // supaya __dirname bisa dipakai di ES Module

dotenv.config();

const app = express();

// Konversi untuk dapatkan __dirname (karena pakai ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware global untuk JSON & form
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware file upload
app.use(
    fileUpload({
        createParentPath: true, // otomatis buat folder kalau belum ada
        limits: { fileSize: 100 * 1024 * 1024 }, // limit 100MB (cocok buat video juga)
        abortOnLimit: true,
        useTempFiles: true, // lebih aman untuk file besar
        tempFileDir: path.join(__dirname, "tmp"), // folder sementara
    })
);

// Static folder biar bisa akses file hasil upload langsung via URL
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes (hubungkan ke controller via routes/index.js)
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

export default app;
