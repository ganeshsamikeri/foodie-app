import React from "react";
import "./MobileApp.css";

const MobileApp = () => {
  return (
    <div className="mobile-app-page no-footer">
      <h1 className="mobile-title">Download Our Mobile App</h1>

      <p className="mobile-text">
        Order food easily with our fast and simple mobile app. Track your orders,
        get instant deals, and enjoy a seamless experience anytime, anywhere.
      </p>

      <div className="mobile-buttons">
        <button className="store-btn">Download on Play Store</button>
        <button className="store-btn">Download on App Store</button>
      </div>
    </div>
  );
};

export default MobileApp;
