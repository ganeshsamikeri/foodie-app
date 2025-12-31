
import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaGift,
  FaComments,
  FaArrowUp,
} from "react-icons/fa";

import "./floatingBar.css";

const FloatingBottomBar = ({
  cartCount = 0,
  offerCount = 0,
  chatCount = 0,
  onCart,
  onOffers,
  onChat,
  dark = false,
}) => {
  const [mounted, setMounted] = useState(false);

  /* -------------------------------
     ⭐ Bounce Animation
  -------------------------------- */
  useEffect(() => {
    setTimeout(() => setMounted(true), 150);
  }, []);

  /* -------------------------------
     ⭐ Hide on Scroll + Show on Load
  -------------------------------- */
  useEffect(() => {
    const bar = document.querySelector(".floating-bottom-bar");

    // Show on load
    setTimeout(() => bar?.classList.add("show"), 300);

    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      if (!bar) return;

      if (current > lastScroll) bar.classList.add("hide");
      else bar.classList.remove("hide");

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------------------------------
     ⭐ Mobile Haptic Feedback
  -------------------------------- */
  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(20);
  };

  /* -------------------------------
     ⭐ AI Floating Chat Bubble
  -------------------------------- */
  const openChat = () => {
    vibrate();
    onChat();
  };

  const scrollTop = () => {
    vibrate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ⭐ AI Floating Chat Bubble */}
      <div
        className={`chat-ai-bubble ${dark ? "dark" : ""}`}
        onClick={openChat}
      >
        <FaComments />
        {chatCount > 0 && <span className="chat-badge">{chatCount}</span>}
      </div>

      <div
        className={`floating-bottom-bar 
          ${mounted ? "bounce" : ""}
          ${dark ? "dark" : ""}
        `}
      >
        {/* Cart */}
        <div
          className="fbb-item"
          onClick={() => {
            vibrate();
            onCart();
          }}
        >
          <FaShoppingCart className="fbb-icon" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
          <p>Cart</p>
        </div>

        {/* Offers */}
        <div
          className="fbb-item"
          onClick={() => {
            vibrate();
            onOffers();
          }}
        >
          <FaGift className="fbb-icon" />
          {offerCount > 0 && <span className="badge">{offerCount}</span>}
          <p>Offers</p>
        </div>

        {/* Chat */}
        <div
          className="fbb-item"
          onClick={openChat}
        >
          <FaComments className="fbb-icon" />
          {chatCount > 0 && <span className="badge">{chatCount}</span>}
          <p>Chat</p>
        </div>

        {/* Top */}
        <div className="fbb-item" onClick={scrollTop}>
          <FaArrowUp className="fbb-icon" />
          <p>Top</p>
        </div>
      </div>
    </>
  );
};

export default FloatingBottomBar;
