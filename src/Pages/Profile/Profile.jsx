// src/Pages/Profile/Profile.jsx
import React, { useState } from "react";
import "./Profile.css";
import {
  FaMoon,
  FaSun,
  FaShoppingBag,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { getMyOrders } from "../../api/ordersApi";

const Profile = ({ user, onLogout, dark, toggleDark }) => {
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 FETCH ORDERS FROM BACKEND
  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getMyOrders();
      setOrders(data);
      setShowOrders(true);
    } catch (err) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SAFE USER FALLBACK
  const displayName = user?.name || "User";
  const displayEmail = user?.email || "Logged in user";

  return (
    <div className={`profile-page ${dark ? "dark" : ""}`}>
      {/* ================= HEADER ================= */}
      <div className="profile-header">
        <img
          src={user?.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="profile-avatar"
        />

        <h2>{displayName}</h2>
        <p>{displayEmail}</p>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-box">
            <h3>{orders.length}</h3>
            <span>Orders</span>
          </div>
          <div className="stat-box">
            <h3>0</h3>
            <span>Wishlist</span>
          </div>
          <div className="stat-box">
            <h3>0</h3>
            <span>Badges</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="profile-card">
        <div className="pc-item">
          <FaCog />
          <p>Settings</p>
        </div>

        {/* ✅ MY ORDERS */}
        <div className="pc-item" onClick={loadOrders}>
          <FaShoppingBag />
          <p>My Orders</p>
        </div>

        {/* DARK MODE */}
        <div className="pc-item" onClick={toggleDark}>
          {dark ? <FaSun /> : <FaMoon />}
          <p>{dark ? "Light Mode" : "Dark Mode"}</p>
        </div>

        {/* LOGOUT */}
        <div className="pc-item logout" onClick={onLogout}>
          <FaSignOutAlt />
          <p>Logout</p>
        </div>
      </div>

      {/* ================= ORDERS LIST ================= */}
      {showOrders && (
        <div className="orders-section">
          <h3>My Orders</h3>

          {loading ? (
            <p>Loading...</p>
          ) : orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <p>
                  <b>Order ID:</b> {order.id}
                </p>
                <p>
                  <b>Restaurant:</b> {order.restaurantName}
                </p>
                <p>
                  <b>Total:</b> ₹{order.totalAmount}
                </p>
                <p>
                  <b>Status:</b> {order.status}
                </p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
