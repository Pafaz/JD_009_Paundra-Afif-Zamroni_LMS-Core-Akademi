# 🎓 LMS Core Akademi  

Learning Management System (LMS) untuk **Core Akademi** yang mendukung pembelajaran online dengan sistem **course**, **sesi 1-on-1**, dan **feedback**.  
Aplikasi ini dibangun dengan **Next.js (frontend)** dan **Express.js + Prisma + PostgreSQL (backend)**.  

---

## 🚀 Tech Stack  

### **Backend**  
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white) – REST API  
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) – ORM untuk PostgreSQL  
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) – Database  
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) – Authentication & role-based authorization  

### **Frontend**  
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) – React Framework  
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) – Type Safety  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) – Styling

---

## 📂 Project Structure  

### Backend (`/backend`)  
```
/controllers    → Handler untuk request (auth, course, session, material, feedback)
/services       → Business logic layer (menghubungkan controller dengan repository)
/repositories   → Query database via Prisma
/routes         → Routing API
/middleware     → Middleware (authMiddleware, requireRole)
/prisma         → Prisma schema & migration
/cron           → Cron jobs (auto delete session > 7 hari)
/public         → File statis (jika dibutuhkan untuk akses publik)
/utils          → Helper function (formatter, error handler, dll.)
/validations    → Validasi request (misalnya pakai Joi/Zod/Yup)
/tmp            → Temp storage (misalnya untuk upload file sementara)
```

### Frontend (`/frontend`)  
```
/pages          → Halaman Next.js
/components     → UI Components
/lib            → API fetcher
```

---

## 🔑 Features  

### **Authentication**  
- Register (Mentor / Student)  
- Login (JWT token)  

### **Course Management**  
- 👨‍🏫 Mentor buat course → menghasilkan **kode unik**  
- 👩‍🎓 Student join course dengan kode (setelah pembayaran)  
- Semua user bisa lihat daftar & detail course  

### **Material**  
- Mentor upload materi (CRUD)  
- Student akses materi course  

### **Session (1-on-1)**  
- Mentor buat sesi 1-on-1  
- Student join sesi  
- Mentor & Student lihat jadwal sesi masing-masing  
- Mentor update status sesi  

### **Feedback**  
- User bisa memberi feedback  
- CRUD feedback  

---

## ⚙️ Installation  

### 1. Clone Repository  
```bash
git clone https://github.com/Pafaz/JD_009_Paundra-Afif-Zamroni_LMS-Core-Akademi.git
cd lms-core-akademi
```

### 2. Setup Backend  
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

### 3. Setup Frontend  
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## 🌐 API Endpoints  

### **Auth**  
- `POST /auth/register` → Register user (mentor/student)  
- `POST /auth/login` → Login  

### **Course**  
- `POST /course` (mentor only) → Buat course  
- `GET /course` → List semua course  
- `GET /course/:id` → Detail course  
- `POST /course/join` (student only) → Join course pakai kode  

### **Material**  
- `POST /material` (mentor only) → Upload materi  
- `GET /material` → List materi  
- `GET /material/:id` → Detail materi  
- `PUT /material/:id` (mentor only) → Update materi  
- `DELETE /material/:id` (mentor only) → Hapus materi  

### **Session (1-on-1)**  
- `POST /session` → Buat sesi  
- `GET /session/mentor/:mentorId` → List sesi mentor  
- `GET /session/student/:studentId` → List sesi student  
- `PATCH /session/:id/status` → Update status sesi  

### **Feedback**  
- `POST /feedback` → Buat feedback  
- `GET /feedback` → List semua feedback  
- `GET /feedback/:id` → Detail feedback  
- `DELETE /feedback/:id` → Hapus feedback  

---

## 👥 Roles & Flow  

- **Mentor**  
  - Register → Login → Buat course → Dapat kode unik → Upload materi → Buat sesi 1-on-1 → Beri feedback  

- **Student**  
  - Register → Login → Join course dengan kode → Akses materi → Join sesi 1-on-1 → Beri feedback  

---

## 📌 Environment Variables  

### Backend `.env.example`  
```env
DATABASE_URL="postgresql://username:password@localhost:5432/lmsdb"
JWT_SECRET="yoursecretkey"
PORT=5000
```

### Frontend `.env.example`  
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
