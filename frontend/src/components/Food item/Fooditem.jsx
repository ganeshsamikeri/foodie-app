// src/components/FoodItem/FoodItem.jsx
import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ item }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const quantity = cartItems[item.name] || 0;

  const handleAdd = () => {
    addToCart(item.name);
    navigate("/order");   // 🚀 Go to checkout
  };

  return (
    <div className="food-item">
      <img src={item.image} alt={item.name} className="food-img" />

      <h3 className="food-title">{item.name}</h3>
      <p className="food-desc">{item.description}</p>
      <p className="food-price">₹{item.price}</p>

      {/* ADD BUTTON or COUNTER */}
      {quantity === 0 ? (
        <button className="add-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      ) : (
        <div className="counter-box">
          <button className="counter-btn" onClick={() => removeFromCart(item.name)}>-</button>
          <span>{quantity}</span>
          <button className="counter-btn" onClick={() => addToCart(item.name)}>+</button>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
