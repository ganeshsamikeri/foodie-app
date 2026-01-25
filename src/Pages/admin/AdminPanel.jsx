import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaChartLine, FaBoxOpen, FaPlusCircle, FaClipboardList, FaSignOutAlt, FaHome } from 'react-icons/fa';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo-text">Swiggy</span>
          <span className="admin-badge">ADMIN</span>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i><FaChartLine /></i>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/add" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i><FaPlusCircle /></i>
            <span>Add Items</span>
          </NavLink>

          <NavLink to="/admin/list" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i><FaClipboardList /></i>
            <span>List Items</span>
          </NavLink>

          <NavLink to="/admin/orders" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <i><FaBoxOpen /></i>
            <span>Orders</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="back-home-btn" onClick={() => navigate('/')}>
             <i><FaHome /></i> <span>Back to Site</span>
          </button>
          <button className="logout-btn">
             <i><FaSignOutAlt /></i> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-content-area">
        <header className="admin-header">
           <div className="header-search">
              <input type="text" placeholder="Search orders, items..." />
           </div>
           <div className="admin-profile">
              <div className="admin-info">
                 <p>Admin User</p>
                 <span>System Manager</span>
              </div>
              <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" />
           </div>
        </header>

        <section className="admin-view">
           <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;
