import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { FaBox, FaMotorcycle, FaCheckCircle, FaTimesCircle, FaRupeeSign, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 154,
    delivered: 128,
    pending: 18,
    cancelled: 8,
    revenue: 45200,
    activeRiders: 24
  });

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your restaurant performance in real-time</p>
      </div>

      <div className="stats-widgets">
        <div className="stat-widget">
           <div className="widget-icon primary"><FaBox /></div>
           <div className="widget-info">
              <span>Total Orders</span>
              <h3>{stats.totalOrders}</h3>
              <p className="trend positive"><FaChartLine /> +12% this week</p>
           </div>
        </div>

        <div className="stat-widget">
           <div className="widget-icon green"><FaMotorcycle /></div>
           <div className="widget-info">
              <span>Active Riders</span>
              <h3>{stats.activeRiders}</h3>
              <p>On duty now</p>
           </div>
        </div>

        <div className="stat-widget">
           <div className="widget-icon gold"><FaRupeeSign /></div>
           <div className="widget-info">
              <span>Total Revenue</span>
              <h3>₹{stats.revenue.toLocaleString()}</h3>
              <p className="trend positive"><FaChartLine /> +8% growth</p>
           </div>
        </div>

        <div className="stat-widget">
           <div className="widget-icon purple"><FaCheckCircle /></div>
           <div className="widget-info">
              <span>Delivery Rate</span>
              <h3>94%</h3>
              <p>On-time performance</p>
           </div>
        </div>
      </div>

      <div className="dashboard-grid">
         <div className="activity-card">
            <div className="card-header">
               <h3>Recent Orders</h3>
               <button className="view-all">View All</button>
            </div>
            <div className="recent-list">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="recent-item">
                    <div className="item-meta">
                       <p className="order-id">#ORD-492{i}</p>
                       <span>2 mins ago</span>
                    </div>
                    <div className="item-details">
                       <p>Chicken Biryani × 2</p>
                       <span>₹450 • Amazon Pay</span>
                    </div>
                    <span className="status-badge pending">Pending</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="performance-card">
            <div className="card-header">
               <h3>Revenue Trend</h3>
               <select>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
               </select>
            </div>
            <div className="chart-placeholder">
               {/* 📊 Simulated Bar Chart */}
               <div className="bar-container">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="bar-wrapper">
                       <div className="bar" style={{ height: `${h}%` }}></div>
                       <span>Day {i+1}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

