import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./AdminOrders.css";

const API_URL = "http://localhost:8080";

const STATUSES = [
  "PLACED",
  "CONFIRMED",
  "COOKING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("foodie_user"));
  const token = storedUser?.token;

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/orders/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data || []);
      } catch {
        toast.error("Failed to load admin orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        null,
        {
          params: { status },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");
    } catch {
      toast.error("Status update failed");
    }
  };

  /* ================= CANCEL ================= */
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/cancel`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order cancelled");
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <h3>Loading orders...</h3>;

  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>

      {orders.map((order, index) => (
        <div
          key={`${order.id}-${index}`}   // ✅ FIXED DUPLICATE KEY
          className="admin-order-card"
        >
          <div className="header">
            <b>Order #{order.id}</b>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          <p>User: {order.userEmail}</p>
          <p>Total: ₹{order.totalAmount}</p>

          <ul>
            {order.items?.map((item, i) => (
              <li key={`${item.foodId}-${i}`}>
                {item.foodName} × {item.quantity}
              </li>
            ))}
          </ul>

          {/* STATUS CHANGE */}
          <select
            value={order.status}
            disabled={
              order.status === "DELIVERED" ||
              order.status === "CANCELLED"
            }
            onChange={(e) =>
              updateStatus(order.id, e.target.value)
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* CANCEL */}
          {order.status !== "DELIVERED" &&
            order.status !== "CANCELLED" && (
              <button
                className="cancel-btn"
                onClick={() => cancelOrder(order.id)}
              >
                ❌ Cancel Order
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
