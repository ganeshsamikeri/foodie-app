// src/components/FoodDisplay/FoodDisplay.jsx
import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const { food_list, addToCart, cartItems, removeFromCart } =
    useContext(StoreContext);
  const [selectedFood, setSelectedFood] = useState(null);

  const filteredFoods =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You 🍽️</h2>

      <div className="food-list">
        {filteredFoods && filteredFoods.length > 0 ? (
          filteredFoods.map((item, index) => (
            <div className="food-item" key={index}>
              <img
                src={item.image}
                alt={item.name}
                className="food-item-image"
              />

              <div className="food-item-details">
                <h4>{item.name}</h4>
                <div className="food-rating">
                  ⭐ {item.rating ? item.rating.toFixed(1) : "4.5"} / 5
                </div>
                <p className="food-description">
                  {item.description || "Delicious and freshly made!"}
                </p>

                {/* Updated: INR Symbol */}
                <p className="food-price">₹{item.price}</p>

                <button
                  className="view-details-btn"
                  onClick={() => setSelectedFood(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No dishes found for this category.</p>
        )}
      </div>

      {/* Modal */}
      {selectedFood && (
        <div
          className="food-modal-overlay"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="food-modal"
            onClick={(e) => e.stopPropagation()} // prevent overlay close
          >
            <img
              src={selectedFood.image}
              alt={selectedFood.name}
              className="food-modal-image"
            />
            <div className="food-modal-content">
              <h3>{selectedFood.name}</h3>

              <div className="food-rating">
                ⭐ {selectedFood.rating ? selectedFood.rating.toFixed(1) : "4.5"} / 5
              </div>

              <p>{selectedFood.description}</p>

              {/* Updated: INR Symbol */}
              <p className="food-price">₹{selectedFood.price}</p>

              <div className="cart-controls">
                {cartItems[selectedFood.name] ? (
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => removeFromCart(selectedFood.name)}
                    >
                      -
                    </button>
                    <span>{cartItems[selectedFood.name]}</span>
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(selectedFood.name)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(selectedFood.name)}
                  >
                    Add to Cart 🛒
                  </button>
                )}
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedFood(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
