# 🎓 LMS Core Akademi  

Learning Management System (LMS) untuk **Core Akademi** yang mendukung pembelajaran online dengan sistem **course**, **sesi 1-on-1**, dan **feedback**.  
Aplikasi ini dibangun dengan **Next.js (frontend)** dan **Express.js + Prisma + PostgreSQL (backend)**.  

---

## 🚀 Tech Stack  

### **Backend**  
- [Express.js](https://expressjs.com/) – REST API  
- [Prisma](https://www.prisma.io/) – ORM untuk PostgreSQL  
- [PostgreSQL](https://www.postgresql.org/) – Database  
- JWT-based authentication & role-based authorization  

### **Frontend**  
- [Next.js](https://nextjs.org/) – React Framework  
- [TypeScript](https://www.typescriptlang.org/) – Type Safety  
- [Tailwind CSS](https://tailwindcss.com/) – Styling  

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
/cron           → Cron jobs (misalnya auto-expire session, reminder, dll.)
/public         → File statis (jika dibutuhkan untuk akses publik)
/utils          → Helper function (formatter, error handler, dll.)
/validations    → Validasi request (misalnya pakai Joi/Zod/Yup)
/tmp            → Temp storage (misalnya untuk upload file sementara)
```

### Frontend (`/frontend`)  
```
/pages          → Halaman Next.js
/components     → UI Components
/services       → API fetcher
/utils          → Helper (formatter, validation, dll.)
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
git clone https://github.com/username/lms-core-akademi.git
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

---

## 📜 License  
MIT License © 2025 Core Akademi  
