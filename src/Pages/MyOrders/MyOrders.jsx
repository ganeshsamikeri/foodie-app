import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const API_URL = "http://localhost:8080";

const STATUS_STEPS = [
  "PLACED",
  "CONFIRMED",
  "COOKING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("foodie_user"));
  const token = storedUser?.token;

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <h3 className="center">Loading orders...</h3>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <OrderCard
          key={`${order.id}-${order.createdAt}`}   // ✅ FIXED DUPLICATE KEY
          order={order}
        />
      ))}
    </div>
  );
};

/* ================= ORDER CARD ================= */
const OrderCard = ({ order }) => {
  const { food_list, addToCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("foodie_user"));
  const token = storedUser?.token;

  const isCancelled = order.status === "CANCELLED";
  const stepIndex = STATUS_STEPS.indexOf(order.status);

  const progress =
    stepIndex >= 0
      ? (stepIndex / (STATUS_STEPS.length - 1)) * 100
      : 0;

  /* ================= REORDER ================= */
  const handleReorder = () => {
    if (!order.items || order.items.length === 0) {
      toast.error("No items found");
      return;
    }

    let added = 0;

    order.items.forEach((item) => {
      const exists = food_list.some(
        (f) => Number(f.id) === Number(item.foodId)
      );

      if (exists) {
        addToCart(item.foodId, item.quantity);
        added++;
      }
    });

    if (added === 0) {
      toast.error("Items unavailable 😔");
      return;
    }

    toast.success("Items added to cart 🛒");
    navigate("/cart");
  };

  /* ================= CANCEL ORDER ================= */
  const handleCancel = async () => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${order.id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order cancelled ❌");
    } catch {
      toast.error("Cannot cancel this order");
    }
  };

  return (
    <div
      className={`order-card 
        ${order.status === "DELIVERED" ? "delivered" : ""}
        ${isCancelled ? "cancelled" : ""}
      `}
    >
      {/* HEADER */}
      <div className="order-header">
        <span className="order-status">
          {order.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* CANCELLED */}
      {isCancelled && (
        <p className="cancelled-text">❌ Order Cancelled</p>
      )}

      {/* TRACKER */}
      {!isCancelled && (
        <>
          <div className="tracker">
            <div className="tracker-bg" />
            <div
              className="tracker-progress"
              style={{ width: `${progress}%` }}
            />
            <div
              className="tracker-dot"
              style={{ left: `${progress}%` }}
            />
          </div>

          <div className="tracker-labels">
            {STATUS_STEPS.map((step, index) => (
              <span
                key={step}
                className={index <= stepIndex ? "active" : ""}
              >
                {step.replaceAll("_", " ")}
              </span>
            ))}
          </div>
        </>
      )}

      {/* TIME */}
      <p className="order-time">
        Ordered on:{" "}
        {order.createdAt
          ? new Date(order.createdAt).toLocaleString()
          : "N/A"}
      </p>

      {/* DELIVERED */}
      {order.status === "DELIVERED" && !isCancelled && (
        <>
          <p className="success">Delivered ✅</p>
          <button className="reorder-btn" onClick={handleReorder}>
            🔁 Reorder
          </button>
        </>
      )}

      {/* CANCEL BUTTON */}
      {order.status !== "DELIVERED" &&
        order.status !== "CANCELLED" && (
          <button className="cancel-btn" onClick={handleCancel}>
            ❌ Cancel Order
          </button>
        )}

      {/* ETA */}
      {order.status !== "DELIVERED" && !isCancelled && (
        <p className="eta">Arriving in 20–30 mins</p>
      )}
    </div>
  );
};

export default MyOrders;
