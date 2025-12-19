import React from "react";
import "./offers.css";

const Offers = () => {
  const offers = [
    { id: 1, title: "50% OFF on Biryani", code: "BIRYANI50" },
    { id: 2, title: "Buy 1 Get 1 Free Pizza", code: "PIZZA1+1" },
    { id: 3, title: "₹100 OFF on orders above ₹499", code: "SAVE100" }
  ];

  return (
    <div className="offers-page">
      <h2>🔥 Best Offers for You</h2>
      <div className="offers-list">
        {offers.map((o) => (
          <div key={o.id} className="offer-card">
            <h3>{o.title}</h3>
            <button>Apply: {o.code}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
