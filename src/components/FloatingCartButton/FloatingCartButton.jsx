import React, { useContext, useEffect, useState } from "react";
import "./FloatingCartButton.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FloatingCartButton = () => {
  const { getCartCount } = useContext(StoreContext);
  const count = getCartCount();

  const [animate, setAnimate] = useState(false);

  // Animate ONLY when item is added
  useEffect(() => {
    if (count > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <Link
      to="/cart"
      className={`float-cart ${animate ? "burst" : ""}`}
    >
      <img src={assets.basket_icon} alt="cart" />

      {/* SHOW COUNT ONLY IF CART HAS ITEMS */}
      {count > 0 && <span className="badge">{count}</span>}

      {/* BURST ANIMATION ONLY ON ADD */}
      {animate && count > 0 && (
        <>
          <span className="ring ring1"></span>
          <span className="ring ring2"></span>
        </>
      )}
    </Link>
  );
};

export default FloatingCartButton;
