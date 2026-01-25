import React, { useContext } from "react";
import "./Fooditem.css";
import { StoreContext } from "../../context/StoreContext";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";

const FoodItem = ({ item, onItemClick }) => {
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);
  const quantity = cartItems[item.name] || 0;

  // Swiggy-style logic: If name contains salad/veg, it's veg (simplification for UI demo)
  const isVeg = item.name.toLowerCase().includes("salad") || item.name.toLowerCase().includes("veg");

  return (
    <div className="food-item-container animate-zoom">
      <div className="image-section" onClick={() => onItemClick(item)}>
        <img src={item.image} alt={item.name} className="food-image" />
        <div className="offer-overlay">
          <span>60% OFF UPTO ₹120</span>
        </div>
        
        <div className="cart-action-wrapper" onClick={(e) => e.stopPropagation()}>
          {quantity === 0 ? (
            <button className="swiggy-add-btn" onClick={() => addToCart(item.name)}>
              ADD
            </button>
          ) : (
            <div className="swiggy-qty-control">
              <button onClick={() => removeFromCart(item.name)}><FaMinus size={11} /></button>
              <span>{quantity}</span>
              <button onClick={() => addToCart(item.name)}><FaPlus size={11} /></button>
            </div>
          )}
        </div>
      </div>

      <div className="details-section">
        <div className="item-meta">
          <div className={`indicator ${isVeg ? "veg" : "non-veg"}`}>
            <div className="dot"></div>
          </div>
          {item.bestseller && <span className="bestseller">⭐ Bestseller</span>}
        </div>

        <h3 className="item-name">{item.name}</h3>
        
        <div className="rating-price-row">
          <div className="rating-badge">
            <FaStar size={10} />
            <span>4.4</span>
          </div>
          <span className="price">₹{item.price}</span>
        </div>

        <p className="item-desc">
          {item.description || "Fresh and flavorful dish prepared with premium ingredients."}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
