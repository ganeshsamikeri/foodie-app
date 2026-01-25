import React, { useState, useEffect } from "react";
import "./NotificationBar.css";

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentOffer, setCurrentOffer] = useState(0);

  const offers = [
    "🔥 Flash Sale: 50% OFF on all Pizzas! Use code PIZZA50",
    "🚚 Free Delivery on your first 3 orders!",
    "🍰 Dessert Week: Buy 1 Get 1 Free on all cakes",
    "💳 10% instant cashback with HDFC Credit Cards"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="notification-bar">
      <div className="bar-content">
        <span className="offer-text">{offers[currentOffer]}</span>
        <button className="close-bar" onClick={() => setIsVisible(false)}>✕</button>
      </div>
    </div>
  );
};

export default NotificationBar;
