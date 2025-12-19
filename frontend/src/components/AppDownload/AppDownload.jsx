import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">
        <h2>
          Download the <span>Foodie</span> App
        </h2>
        <p>
          Order your favorite meals on the go — fast, easy, and delicious!  
          Get the app now and enjoy exclusive deals 🍔📱
        </p>

        <div className="download-section">
          {/* Left: App store buttons */}
          <div className="download-buttons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.play_store}
                alt="Download on Google Play"
                className="store-icon"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={assets.app_store}
                alt="Download on App Store"
                className="store-icon"
              />
            </a>
          </div>

          {/* Right: QR code */}
          <div className="qr-section">
            <img
              src={assets.qr_code}
              alt="Scan QR to download Foodie App"
              className="qr-code"
            />
            <p>Scan to Download</p>
          </div>
        </div>
      </div>

      {/* Right: app image */}
      <div className="app-image">
        <img src={assets.mobile_app_preview} alt="Foodie App Preview" />
      </div>
    </div>
  );
};

export default AppDownload;
