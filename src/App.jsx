// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

import FloatingCartButton from "./components/FloatingCartButton/FloatingCartButton";
import FloatingBottomBar from "./components/FloatingBottomBar/FloatingBottomBar";
import ChatSupportPanel from "./components/ChatSupportPanel/ChatSupportPanel";

// Pages
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Profile from "./Pages/Profile/Profile";
import Menu from "./Pages/Menu/Menu";
import MobileApp from "./Pages/MobileApp/MobileApp";
import Contact from "./Pages/Contact/Contact";
import MyOrders from "./Pages/MyOrders/MyOrders";
import AdminOrders from "./Pages/AdminOrders/AdminOrders";
import AdminDashboard from "./Pages/admin/AdminDashboard";

/* =========================
   🔐 PROTECTED ROUTE
========================= */
const ProtectedRoute = ({ user, children }) => {
  if (!user?.token) {
    toast.error("Please login to continue");
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showChat, setShowChat] = useState(false);

  /* =========================
     🔁 RESTORE LOGIN
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("foodie_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("foodie_user", JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
    toast.success("Login successful 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("foodie_user");
    setUser(null);
    toast.success("Logged out successfully 👋");
    navigate("/");
  };

  return (
    <div className="app-wrapper">
      <Navbar
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute user={user}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      <FloatingCartButton onClick={() => navigate("/cart")} />

      <FloatingBottomBar
        cartCount={3}
        offerCount={5}
        chatCount={1}
        onCart={() => navigate("/cart")}
        onOffers={() => navigate("/offers")}
        onChat={() => setShowChat(true)}
      />

      {showChat && <ChatSupportPanel onClose={() => setShowChat(false)} />}

      <Footer />
      <Toaster position="top-center" />
      {showLogin && (
        <LoginPopup onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
