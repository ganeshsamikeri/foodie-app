import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page no-footer">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach out anytime.</p>

      <div className="contact-grid">

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Message..." rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Location</h3>

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=India&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="map"
          ></iframe>

          <h3>Social Links</h3>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
