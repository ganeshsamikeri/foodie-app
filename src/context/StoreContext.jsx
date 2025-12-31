// src/context/StoreContext.jsx
import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // Add to cart
  const addToCart = (itemName) => {
    setCartItems((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  // Remove from cart
  const removeFromCart = (itemName) => {
    setCartItems((prev) => {
      if (!prev[itemName]) return prev;
      const updated = { ...prev };
      updated[itemName] -= 1;
      if (updated[itemName] <= 0) delete updated[itemName];
      return updated;
    });
  };

  // Cart total count
  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
