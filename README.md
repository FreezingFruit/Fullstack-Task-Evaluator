# 🚀 Task Manager App (MEVN Stack)

## 📚 What I Built

### Backend (Node.js + Express + MongoDB)
- **User authentication** with JWT tokens
- **Protected API routes** that check if you're logged in
- **CRUD operations** for tasks (Create, Read, Update, Delete)
- **MongoDB database** to store users and tasks
- **Password encryption** using bcrypt (security is important!)

### Frontend (Vue 3 + TypeScript)
- **Login & Register pages** with form validation
- **Task dashboard** to see all your tasks
- **Add new tasks** and mark them as done/not done
- **Delete tasks** you don't need anymore
- **Protected routes** - can't see tasks unless logged in
- **Clean UI** with Element Plus components

## 🛠️ Tech Stack

**Frontend:**
- Vue 3 (with Composition API)
- TypeScript (my first time using it!)
- Pinia for state management
- Vue Router for navigation
- Element Plus UI components
- Tailwind CSS for styling

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## 🎯 Features That Work

 User registration and login  
 Create, read, update, delete tasks  
 Each user only sees their own tasks  
 Automatic logout when token expires  
 Form validation (email format, required fields)  
 404 page for broken links  
 Responsive design  


## 📦 How to Run This

### Backend:
```bash
cd backend
npm install
npm run dev
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```
