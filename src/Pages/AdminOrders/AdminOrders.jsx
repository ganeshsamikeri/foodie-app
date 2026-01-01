import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import "./AdminOrders.css";

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

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/admin/orders/all");
        setOrders(res.data || []);
      } catch (err) {
        toast.error("Failed to load admin orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/api/admin/orders/${orderId}/status`, null, {
        params: { status },
      });

      toast.success("Status updated");

      // refresh orders
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status } : o
        )
      );
    } catch {
      toast.error("Status update failed");
    }
  };

  /* ================= CANCEL ================= */
  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/api/admin/orders/${orderId}/cancel`);
      toast.success("Order cancelled");

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <h3>Loading orders...</h3>;

  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="admin-order-card">
          <div className="header">
            <b>Order #{order.id}</b>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          <p>User: {order.userEmail}</p>
          <p>Total: ₹{order.totalAmount}</p>

          <ul>
            {order.items?.map((item) => (
              <li key={item.foodId}>
                {item.foodName} × {item.quantity}
              </li>
            ))}
          </ul>

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
