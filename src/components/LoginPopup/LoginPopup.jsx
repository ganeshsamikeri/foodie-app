// src/components/LoginPopup/LoginPopup.jsx
import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import "./LoginPopup.css";

const LoginPopup = ({ onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔒 Disable scroll when popup opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔐 LOGIN / REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👉 REGISTER
      if (isSignUp) {
        await api.post("/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "USER",
        });

        toast.success("Account created 🎉 Please login");
        setIsSignUp(false);
        return;
      }

      // 👉 LOGIN
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const userData = {
        email: response.data.email || formData.email,
        role: response.data.role,
        token: response.data.token,
      };

      // 🔑 Save to localStorage
      localStorage.setItem("foodie_user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful 🎉");

      // 🔔 Notify App.jsx
      onLogin(userData);
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed ❌ Check email/password"
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{isSignUp ? "Create Account" : "Login"}</h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isSignUp ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="switch-text"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Login"
            : "New user? Register"}
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
