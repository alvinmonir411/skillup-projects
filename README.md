# 🎓 SkillUp – Modern Learning & Teaching Platform

A full-stack MERN/Next.js learning platform where instructors create, manage, and sell courses — and students can learn, grow, and level up.  
Crafted with passion, clean architecture, and a drive to push education forward.

---

## 🚀 Live Demo

🔗 **https://skillup-six.vercel.app/**

---

## 🔐 Login Credentials (Demo Accounts)

### 👨‍🏫 Teacher Account

- **Email:** cikayi5688@ametitas.com
- **Password:** cikayi5688@ametitas.com

### 🛡️ Admin Account

- **Email:** xopire1468@fantastu.com
- **Password:** xopire1468@fantastu.com

### 👤 Student Account

- **Email:** namoyo8627@canvect.com _(or use your own)_
- **Password:** namoyo8627@canvect.com

---

## 🧠 Overview

SkillUp is a modern skill-sharing platform where teachers publish courses, students enroll and learn, and admins keep the ecosystem clean & secure.  
It’s built using the latest Next.js App Router architecture with Server Components, Server Actions, and Authentication powered by Clerk.

The vibe?  
Fast. Scalable. Production-ready. Corporate-clean but Gen-Z friendly.

---

## ✨ Features

### 🔹 Students

- Browse skills & courses
- Enroll in free/paid classes
- Watch lessons & track progress
- User dashboard + profile editing

### 🔹 Teachers

- Create, edit & publish courses
- Upload thumbnails (Cloudinary)
- Add course outcomes, requirements, trailers
- Manage all their uploaded courses

### 🔹 Admin

- Manage users
- Approve/reject courses
- Full system oversight

### 🔹 Core App Features

- Next.js App Router
- Server Actions for forms
- Role-based authentication (Student / Teacher / Admin)
- Cloudinary image uploads
- MongoDB with Mongoose
- Fully responsive UI
- Smooth animations (Framer Motion)
- Toast notifications
- Secure route protection

---

## 🛠️ Tech Stack

### **Frontend**

- Next.js 14+
- React
- Tailwind CSS
- Framer Motion
- TypeScript

### **Backend**

- Next.js Server Actions
- MongoDB + Mongoose
- Cloudinary (thumbnail upload)

### **Auth**

- Clerk Authentication
- Role-based access

### **Deployment**

- Vercel
- MongoDB Atlas

---

## 📦 Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/skillup.git
cd skillup
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Create .env.local and add:
env
Copy code
MONGODB_URI=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
4️⃣ Run locally
bash
Copy code
npm run dev
🧩 Folder Structure (Short Version)
pgsql
Copy code
app/
 ├── (auth)/        → Login/SignUp pages
 ├── (teacher)/     → Teacher dashboard
 ├── (admin)/       → Admin dashboard
 ├── (user)/        → Student dashboard
 ├── actions/       → Server actions (CRUD)
 ├── api/           → API routes (if needed)
 ├── components/    → Reusable UI components
 └── lib/           → Utils (Cloudinary, DB)
📘 Key Features Breakdown
🔸 Server Components
Faster rendering + less client JS.

🔸 Server Actions
All forms like creating/editing courses use secure server-side actions.

🔸 Dynamic Routing
Each course has its own page, edit routes, user routes, admin routes, etc.

🔸 Cloudinary Integration
Teachers upload thumbnails → auto optimized → saved to DB.

🔸 Role-based Middleware
Protects pages based on user roles.

🤝 Contribution
Pull requests are welcome!
For major changes, please open an issue first to discuss.

📜 License
MIT License — free to use, free to expand.

💙 Credits
Built with dedication by Alvin Monir, MERN Stack Developer.
From Rangpur → building for the world.

yaml
Copy code

---

# Want me to also generate:
✅ Project banner
✅ GitHub description
✅ Badges (build, license, tech stack)
✅ API documentation
✅ ER diagram for DB
Just say the word, bro — I’m ready.
```
