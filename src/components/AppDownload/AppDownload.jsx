import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-container">
        <div className="app-download-left">
            <span className="app-badge">BEST EXPERIENCE</span>
            <h2>Download the <span>Foodie</span> Mobile App</h2>
            <p>
              Order from your favorite restaurants and track your food in real-time. 
              Get <strong>₹150 OFF</strong> on your first app order!
            </p>
            <div className="app-platforms">
                <div className="platform-btn">
                    <img src={assets.play_store} alt="Google Play" />
                </div>
                <div className="platform-btn">
                    <img src={assets.app_store} alt="App Store" />
                </div>
            </div>
            <div className="app-features-list">
                <div className="feat-item">✓ Live Tracking</div>
                <div className="feat-item">✓ Super Fast Delivery</div>
                <div className="feat-item">✓ Exclusive App Discounts</div>
            </div>
        </div>
        <div className="app-download-right">
            <div className="phone-mockup">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/food-delivery-app-illustration-download-in-svg-png-gif-formats--hamburger-mobile-services-on-screen-fast-pack-business-illustrations-4712079.png" alt="App Preview" />
            </div>
            <div className="floating-badge">
                <span>⭐ 4.8</span>
                <p>App Store Rating</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
