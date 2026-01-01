🍔 Foodie Frontend (React)

A Swiggy-like food ordering frontend application built with React (Vite) and deployed on Vercel.
It consumes secure REST APIs from a Spring Boot backend.

🚀 Live Demo

👉 Frontend URL:
https://foodie-app-navy.vercel.app

🛠️ Tech Stack

⚛️ React (Vite)

🧭 React Router

🌐 Axios

🎨 CSS (Responsive UI – Mobile / Tablet / Desktop)

🔐 JWT Authentication (LocalStorage)

🚀 Deployed on Vercel

✨ Features

User Login & Logout

JWT-based authentication

Browse food items

Add to cart

Place orders

View My Orders

Reorder previous orders

Responsive UI (Mobile-first)

Protected routes

🔐 Authentication Flow

User logs in

Backend returns JWT

Token stored in localStorage

Axios sends token in every request:

Authorization: Bearer <JWT_TOKEN>

📂 Project Structure
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── context/
 │   ├── assets/
 │   ├── api/
 │   └── App.jsx
 ├── index.html
 ├── package.json
 └── vite.config.js

⚙️ Environment Variables

Create a .env file:

VITE_API_BASE_URL=https://foodie-backend-ys7x.onrender.com

▶️ Run Locally
git clone https://github.com/ganeshamikeri/foodie-frontend.git
cd foodie-frontend
npm install
npm run dev

🌐 Backend Repository

👉 https://github.com/ganeshamikeri/foodie-backend

👨‍💻 Author

Ganesh Gani
GitHub: https://github.com/ganeshamikeri
