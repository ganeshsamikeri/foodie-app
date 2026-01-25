import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="footer-logo">FOODIE</h2>
            <p>© 2026 Foodie Technologies Pvt. Ltd</p>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Foodie One</li>
              <li>Foodie Instamart</li>
              <li>Foodie Genie</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contact us</h3>
            <ul>
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Legal</h3>
            <ul>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-apps">
            <img src={assets.app_store} alt="App Store" />
            <img src={assets.play_store} alt="Play Store" />
          </div>
        </div>
      </div>
      
      <div className="footer-middle-links">
        <div className="footer-container">
            <div className="city-list">
                <h3>We deliver to:</h3>
                <div className="cities">
                    <span>Bangalore</span>
                    <span>Gurgaon</span>
                    <span>Bhubaneswar</span>
                    <span>Hyderabad</span>
                    <span>Delhi</span>
                    <span>Mumbai</span>
                    <span>Pune</span>
                    <span>Kolkata</span>
                    <span>Chennai</span>
                    <span>Ahmedabad</span>
                    <span className="see-more">589 cities</span>
                </div>
            </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
            <div className="footer-social-row">
                <div className="footer-logo-small">FOODIE</div>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;