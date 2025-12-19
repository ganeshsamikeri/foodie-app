// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

import FloatingCartButton from "./components/FloatingCartButton/FloatingCartButton";
import FloatingBottomBar from "./components/FloatingBottomBar/FloatingBottomBar";
import ChatSupportPanel from "./components/ChatSupportPanel/ChatSupportPanel";

import { Toaster } from "react-hot-toast";

// Pages
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Profile from "./Pages/Profile/Profile";
import Menu from "./Pages/Menu/Menu";
import MobileApp from "./Pages/MobileApp/MobileApp";
import Contact from "./Pages/Contact/Contact";

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // navbar hide on search
  const [searchActive, setSearchActive] = useState(false);

  const cartCount = 3;
  const offerCount = 5;
  const chatCount = 1;

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  return (
    <div className="app-wrapper">

      {/* NAVBAR */}
      {!searchActive && (
        <Navbar
          user={user}
          onLoginClick={() => setShowLogin(true)}
          onLogout={() => setUser(null)}
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/contact-us" element={<Contact />} />   {/* FIXED PATH */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />

        <Route
          path="/offers"
          element={<div style={{ padding: 40 }}>Offers Coming Soon 🚀</div>}
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              onLogout={() => setUser(null)}
            />
          }
        />
      </Routes>

      {/* FLOATING CART BUTTON */}
      <FloatingCartButton onClick={() => navigate("/cart")} />

      {/* FLOATING BOTTOM BAR */}
      <FloatingBottomBar
        cartCount={cartCount}
        offerCount={offerCount}
        chatCount={chatCount}
        onCart={() => navigate("/cart")}
        onOffers={() => navigate("/offers")}
        onChat={() => setShowChat(true)}
      />

      {/* CHAT PANEL */}
      {showChat && <ChatSupportPanel onClose={() => setShowChat(false)} />}

      {/* FOOTER */}
      <Footer />

      {/* TOAST */}
      <Toaster position="top-center" />

      {/* LOGIN POPUP */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
