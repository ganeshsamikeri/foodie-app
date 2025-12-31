import React, { useContext } from "react";
import "./CartPopup.css";
import { StoreContext } from "../../context/StoreContext";

const CartPopup = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    updateQuantity,
    getTotal,
    isCartOpen,
    closeCart,
  } = useContext(StoreContext);

  if (!isCartOpen) return null; // hide popup when closed

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={closeCart}>✕</button>

        <div className="cart-items">
          {Object.keys(cartItems).length === 0 ? (
            <p className="empty">Your cart is empty</p>
          ) : (
            Object.keys(cartItems).map((id) => {
              const item = food_list.find((f) => f._id === id);
              if (!item) return null;

              return (
                <div key={id} className="cart-item">
                  <img src={item.image} alt={item.name} />

                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(id, (cartItems[id] || 1) - 1)
                        }
                      >
                        -
                      </button>

                      <span>{cartItems[id]}</span>

                      <button
                        onClick={() =>
                          updateQuantity(id, (cartItems[id] || 0) + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-footer">
          <h3>Total: ₹{getTotal()}</h3>
          <button className="checkout-btn" onClick={() => window.location = "/cart"}>
            Go to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
