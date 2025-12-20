import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fake shimmer loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate total price (PRICE IS ALREADY INR)
  const getTotalPrice = () => {
    return food_list.reduce((total, item) => {
      const qty = cartItems[item.name] || 0;
      return total + qty * item.price;
    }, 0);
  };

  // Items in cart
  const cartFoods = food_list.filter((item) => cartItems[item.name]);

  // Checkout
  const handleCheckout = () => {
    if (cartFoods.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Redirecting to checkout...", { duration: 800 });
    setTimeout(() => navigate("/order"), 500);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {/* Shimmer */}
      {loading ? (
        <div className="shimmer-wrapper">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shimmer-item"></div>
          ))}
        </div>
      ) : cartFoods.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div className="cart-list">
          {cartFoods.map((item, index) => (
            <div key={index} className="cart-item fade-in">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
              />

              <div className="cart-item-details">
                <h4>{item.name}</h4>

                {/* PRICE EACH */}
                <p>₹{item.price.toFixed(2)} each</p>

                <div className="cart-quantity-controls">
                  {/* – BUTTON */}
                  <button
                    className="qty-btn"
                    onClick={() => {
                      removeFromCart(item.name);
                      toast("Item removed");
                    }}
                  >
                    −
                  </button>

                  <span>{cartItems[item.name]}</span>

                  {/* + BUTTON */}
                  <button
                    className="qty-btn"
                    onClick={() => {
                      addToCart(item.name);
                      toast.success("Quantity increased");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ITEM TOTAL */}
              <div className="cart-item-total">
                ₹{(item.price * cartItems[item.name]).toFixed(2)}
              </div>
            </div>
          ))}

          {/* SUMMARY */}
          <div className="cart-summary">
            <h3>Total: ₹{getTotalPrice().toFixed(2)}</h3>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
