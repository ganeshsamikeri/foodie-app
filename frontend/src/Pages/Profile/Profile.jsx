// src/Pages/Profile/Profile.jsx
import React, { useState } from "react";
import "./profile.css";
import { FaMoon, FaSun, FaShoppingBag, FaCog, FaSignOutAlt } from "react-icons/fa";

const Profile = ({ user, onLogout, dark, toggleDark }) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className={`profile-page ${dark ? "dark" : ""}`}>
      
      {/* HEADER */}
      <div className="profile-header">
        <img
          src={user?.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="profile-avatar"
        />

        <h2>{user?.name || "Guest User"}</h2>
        <p>{user?.email || "guest@example.com"}</p>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <h3>12</h3>
            <span>Orders</span>
          </div>
          <div className="stat-box">
            <h3>4</h3>
            <span>Wishlist</span>
          </div>
          <div className="stat-box">
            <h3>3</h3>
            <span>Badges</span>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="profile-card">

        <div className="pc-item" onClick={() => setOpenSettings(!openSettings)}>
          <FaCog />
          <p>Settings</p>
        </div>

        <div className="pc-item">
          <FaShoppingBag />
          <p>My Orders</p>
        </div>

        {/* Dark mode toggle */}
        <div className="pc-item" onClick={toggleDark}>
          {dark ? <FaSun /> : <FaMoon />}
          <p>{dark ? "Light Mode" : "Dark Mode"}</p>
        </div>

        <div className="pc-item logout" onClick={onLogout}>
          <FaSignOutAlt />
          <p>Logout</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
