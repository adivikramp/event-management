# 🎉 Event Management Platform

A full-stack event management platform where users can create, manage, and view events.

## 🚀 Features

### 🖥️ Frontend:
1. **User Authentication**:
   - Register & log in users securely.

2. **Event Dashboard**:  
   - View a list of upcoming events.
   - Filter events by category.

3. **Event Creation**:  
   - Form to create an event with fields like event name, description, date/time, category and image.

4. **Responsive Design**:  
   - Works seamlessly across all devices. Tested on iPhone 15, Oneplus Nord, and a windows laptop.

---

### ⚙️ Backend:
1. **Authentication API**:
   - Secure authentication using JWT.

2. **Event Management API**:
   - CRUD operations for events.

3. **Database**:  
   - Efficient storage for event and user data using MongoDB.

---

## 🛠️ Tech Stack

**Frontend:**  
- React (Frontend)
- Tailwind CSS (Styling)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Bcrypt for password safety

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/adivikramp/event-management.git
cd event-management
```

**Frontend Variables:**
- VITE_BACKEND_URL
- VITE_CLOUDINARY_CLOUD_KEY

**Backend Variables:**
- CLOUDINARY_CLOUD_KEY
- MONGODB_URI
- SECRET_KEY
- PORT
- FRONTEND_URL

**Backend URL:**
- https://event-management-backend-jade.vercel.app/

**Frontend URL:**
- https://event-management-frontend-wheat-two.vercel.app/

**Test Credentials:**
- email: abc@gmail.com
- password: abc

**Github Repo Links:**
- frontend: https://github.com/adivikramp/event-management/tree/main/frontend
- backend: https://github.com/adivikramp/event-management/tree/main/backend