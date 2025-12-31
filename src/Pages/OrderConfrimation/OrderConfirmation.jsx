import React from "react";
import "./OrderConfirmation.css";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <div className="confirmation-card">
        <CheckCircle className="confirmation-icon" />
        <h2>Thank You for Your Order! 🎉</h2>
        <p>Your delicious food is being prepared and will be delivered soon.</p>
        <p className="order-msg">You’ll receive an update once your order is on the way!</p>

        <button onClick={() => navigate("/")} className="home-btn">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
