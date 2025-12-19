import React from "react";
import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="order-success">
      <div className="success-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          alt="success"
          className="success-icon"
        />
        <h2>🎉 Order Placed Successfully!</h2>
        <p>
          Thank you for your purchase. Your delicious food is being prepared and
          will be delivered soon!
        </p>
        <p className="order-id">
          <strong>Order ID:</strong> #{Math.floor(Math.random() * 1000000)}
        </p>

        <button className="home-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
