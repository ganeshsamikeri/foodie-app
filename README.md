# 🍔 Foodie Frontend (React)

A **Swiggy-like food ordering frontend application** built using **React (Vite)** and deployed on **Vercel**.  
This frontend securely consumes REST APIs from a **Spring Boot backend** using **JWT authentication**.

---

## 🚀 Live Demo

🔗 **Frontend URL:**  
👉 https://foodie-app-navy.vercel.app

---

## 🛠 Tech Stack

- ⚛️ **React (Vite)**
- 🧭 **React Router**
- 🌐 **Axios**
- 🎨 **CSS (Responsive UI – Mobile / Tablet / Desktop)**
- 🔐 **JWT Authentication (LocalStorage)**
- 🚀 **Vercel Deployment**

---

## ✨ Features

- 🔐 User Authentication (Login / Logout)
- 🧾 Browse Food Menu
- 🛒 Add to Cart
- 📦 Place Orders
- 📜 View **My Orders**
- 🔁 Reorder Previous Orders
- 🛡 Protected Routes
- 📱 Fully Responsive UI

---

## 🔐 Authentication Flow

1. User logs in using email & password
2. Backend returns a **JWT token**
3. Token is stored in **LocalStorage**
4. Token is attached to every API request

```http
Authorization: Bearer <JWT_TOKEN>

📂 Project Structure
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── api/
│   ├── assets/
│   └── App.jsx
├── index.html
├── package.json
└── vite.config.js

▶️ Run Locally
git clone https://github.com/ganeshamikeri/foodie-frontend.git
cd foodie-frontend
npm install
npm run dev

🔗 Backend Repository

👉 https://github.com/ganeshamikeri/foodie-backend

👨‍💻 Author

Ganesh Gani
GitHub: https://github.com/ganeshamikeri

⭐ Notes

Backend is deployed separately on Render

CORS is configured to allow this frontend

JWT token is securely handled in frontend

💡 This project is built for learning full-stack development, JWT security, and real-world deployment.
