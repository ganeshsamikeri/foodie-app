import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="loading">Loading dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="cards">
        <div className="card total">Total Orders<br />{stats.totalOrders}</div>
        <div className="card delivered">Delivered<br />{stats.delivered}</div>
        <div className="card pending">Pending<br />{stats.pending}</div>
        <div className="card cancelled">Cancelled<br />{stats.cancelled}</div>
        <div className="card revenue">
          Revenue<br />₹{stats.revenue}
        </div>
      </div>

      <div className="chart">
        <div style={{ height: stats.delivered * 10 }}>Delivered</div>
        <div style={{ height: stats.pending * 10 }}>Pending</div>
        <div style={{ height: stats.cancelled * 10 }}>Cancelled</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
