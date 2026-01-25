import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./MyOrders.css";

const API_URL = "https://foodie-backend-ys7x.onrender.com";

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

      {!Array.isArray(orders) || orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id || order._id} order={order} />
        ))
      )}
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
        <div className="order-header-left">
           <img src={assets.parcel_icon} alt="Parcel" className="parcel-icon" />
           <div className="order-info-text">
             <span className="order-ids">Order #{String(order.id || "").slice(-6)}</span>
             <span className="order-status-badge">
                {order.status.replaceAll("_", " ")}
             </span>
           </div>
        </div>
        {/* <span className="order-status">
          {order.status.replaceAll("_", " ")}
        </span> */}
      </div>

      {/* CANCELLED */}
      {isCancelled && (
        <div className="cancelled-banner">
            <p>❌ Order Cancelled</p>
        </div>
      )}

      {/* TRACKER */}
      {!isCancelled && (
        <div className="tracker-container">
          <div className="tracker">
            <div className="tracker-bg" />
            <div
              className="tracker-progress"
              style={{ width: `${progress}%` }}
            />
            {/* Animated Bike/Dot */}
            <div
              className="tracker-dot"
              style={{ left: `${progress}%` }}
            >
                🛵
            </div>
          </div>

          <div className="tracker-labels">
            {STATUS_STEPS.map((step, index) => (
              <div 
                key={step} 
                className={`tracker-step ${index <= stepIndex ? "active" : ""}`}
              >
                  <div className={`step-dot ${index <= stepIndex ? "filled" : ""}`}></div>
                  <span>{step.replaceAll("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ITEMS LIST (preview) */}
       <div className="order-items-preview">
           {order.items.map((item, idx) => {
               if (idx > 2) return null; 
               return (
                   <span key={idx}>{item.foodName} x{item.quantity}{idx < order.items.length -1 ? ", " : ""}</span>
               )
           })}
           {order.items.length > 3 && <span>... +{order.items.length - 3} more</span>}
       </div>

      {/* TIME & TOTAL */}
      <div className="order-footer">
        <p className="order-time">
            Ordered on:{" "}
            {order.createdAt
            ? new Date(order.createdAt).toLocaleString()
            : "N/A"}
        </p>
        <p className="order-total">Total: ₹{order.totalAmount}</p>
      </div>
      

      {/* DELIVERED ACTIONS */}
      {order.status === "DELIVERED" && !isCancelled && (
        <div className="order-actions">
           <p className="success-msg">Delivered on {new Date().toLocaleDateString()} ✅</p>
           <button className="reorder-btn" onClick={handleReorder}>
            🔁 Reorder
          </button>
        </div>
      )}

      {/* CANCEL BUTTON */}
      {order.status !== "DELIVERED" &&
        order.status !== "CANCELLED" && (
            <div className="order-actions-row">
                 <button className="track-btn">Track Order</button>
                 <button className="cancel-btn-small" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        )}

      {/* ETA */}
      {order.status !== "DELIVERED" && !isCancelled && (
        <p className="eta-badge">🚀 Arriving in 20–30 mins</p>
      )}
    </div>
  );
};

export default MyOrders;
