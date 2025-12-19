import React, { useContext, useEffect, useState } from "react";
import "./FloatingCartButton.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FloatingCartButton = () => {
  const { getCartCount } = useContext(StoreContext);
  const count = getCartCount();

  const [animate, setAnimate] = useState(false);

  // Trigger shake animation when count changes
  useEffect(() => {
    if (count > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (count === 0) return null; // Hide if cart is empty

  return (
    <Link to="/cart" className={`float-cart ${animate ? "shake" : ""}`}>
      <img src={assets.basket_icon} alt="cart" />
      <span className="badge">{count}</span>
      <span className="shimmer"></span>
    </Link>
  );
};

export default FloatingCartButton;
