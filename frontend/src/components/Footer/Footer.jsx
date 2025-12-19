import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left section - Logo and about */}
        <div className="footer-left">
          <h2 className="footer-logo">FOODIE</h2>
          <p className="footer-desc">
            Bringing delicious meals straight to your doorstep. Order your
            favorite dishes anytime, anywhere with Foodie 🍴.
          </p>
          <div className="footer-socials">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="Instagram" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
          </div>
        </div>

        {/* Middle section - Links */}
        <div className="footer-middle">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/order">Place Order</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Right section - Contact */}
        <div className="footer-right">
          <h3>Contact</h3>
          <p>Email: support@foodie.com</p>
          <p>Phone: +1 (555) 234-5678</p>
          <p>Address: 123 Food Street, Taste City</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodie. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;