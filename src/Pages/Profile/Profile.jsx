import React, { useState } from "react";
import "./Profile.css";
import {
  FaUserEdit,
  FaShoppingBag,
  FaSignOutAlt,
  FaCamera,
  FaChevronRight,
  FaWallet,
  FaMapMarkerAlt,
  FaBell,
  FaCheck
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Profile = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container-content">
        
        {/* ⭐ Profile Header Card */}
        <div className="profile-header-card animate-zoom">
          <div className="profile-avatar-wrapper">
            <img src={profileData.avatar} alt="Profile" className="profile-avatar" />
            <div className="avatar-edit-badge"><FaCamera /></div>
          </div>
          
          {isEditing ? (
            <form className="edit-profile-form" onSubmit={handleUpdate}>
              <input 
                type="text" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                placeholder="Name" 
              />
              <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                placeholder="Email" 
              />
              <div className="edit-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn-save"><FaCheck /> Save</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{profileData.name}</h2>
              <p>{profileData.email}</p>
              <div className="stats-grid">
                <div className="stat-item-profile">
                  <h3>12</h3>
                  <span>Orders</span>
                </div>
                <div className="stat-item-profile">
                  <h3>₹240</h3>
                  <span>Savings</span>
                </div>
                <div className="stat-item-profile">
                  <h3>4.8</h3>
                  <span>Rating</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 📋 Profile Menu */}
        <div className="profile-menu">
          <div className="menu-item-profile" onClick={() => setIsEditing(!isEditing)}>
            <i><FaUserEdit /></i>
            <div className="menu-text">
              <span>Edit Profile</span>
              <p>Change your name, email and avatar</p>
            </div>
            <FaChevronRight className="arrow" />
          </div>

          <div className="menu-item-profile">
            <i><FaWallet /></i>
            <div className="menu-text">
              <span>Swiggy Money</span>
              <p>₹0.00 Credits available</p>
            </div>
            <FaChevronRight className="arrow" />
          </div>

          <div className="menu-item-profile">
            <i><FaMapMarkerAlt /></i>
            <div className="menu-text">
              <span>Addresses</span>
              <p>Home, Work and other locations</p>
            </div>
            <FaChevronRight className="arrow" />
          </div>

          <div className="menu-item-profile">
            <i><FaBell /></i>
            <div className="menu-text">
              <span>Notifications</span>
              <p>Offers, updates and order states</p>
            </div>
            <FaChevronRight className="arrow" />
          </div>

          <div className="menu-item-profile logout-item" onClick={onLogout}>
            <i><FaSignOutAlt /></i>
            <div className="menu-text">
              <span>Logout</span>
              <p>Sign out of your account</p>
            </div>
            <FaChevronRight className="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
