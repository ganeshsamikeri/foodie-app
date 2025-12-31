import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { food_list, cartItems, getCartCount } = useContext(StoreContext);
  const navigate = useNavigate();

  // Local state for user form inputs
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "COD", // default
  });

  // Calculate total price
  const totalPrice = food_list.reduce((total, item) => {
    const quantity = cartItems[item.name] || 0;
    return total + quantity * item.price;
  }, 0);

  const handleChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!orderInfo.name || !orderInfo.address || !orderInfo.phone) {
      alert("Please fill all the required fields!");
      return;
    }

    if (getCartCount() === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert(
      `🎉 Order placed successfully!\n\nThank you, ${orderInfo.name}!\nYour total: ₹${totalPrice.toFixed(2)}`
    );

    navigate("/");
  };

  return (
    <div className="place-order-page">
      <h2>Checkout 🧾</h2>

      <div className="checkout-container">
        {/* Left: User form */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h3>Delivery Information</h3>

          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={orderInfo.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              placeholder="Enter your delivery address"
              value={orderInfo.address}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={orderInfo.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Payment Method:
            <select
              name="paymentMethod"
              value={orderInfo.paymentMethod}
              onChange={handleChange}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="Amazon">Amazon Pay</option>
            </select>
          </label>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        {/* Right: Order summary */}
        <div className="order-summary">
          <h3>Order Summary 🛍️</h3>

          <ul>
            {food_list
              .filter((item) => cartItems[item.name])
              .map((item, index) => (
                <li key={index}>
                  <span>
                    {item.name} × {cartItems[item.name]}
                  </span>
                  <span>₹{(item.price * cartItems[item.name]).toFixed(2)}</span>
                </li>
              ))}
          </ul>

          <hr />
          <p className="total">
            <strong>Total:</strong> ₹{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
