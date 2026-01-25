import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
    return (
        <div className="newsletter-section">
            <div className="newsletter-card">
                <div className="newsletter-content">
                    <h2>Hungry for more?</h2>
                    <p>Subscribe to our newsletter and get <strong>₹100 OFF</strong> on your next order!</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit">Subscribe Now</button>
                    </form>
                    <p className="newsletter-note">By subscribing, you agree to our Terms and Privacy Policy.</p>
                </div>
                <div className="newsletter-decor">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/fast-food-offer-illustration-download-in-svg-png-gif-formats--hamburger-fries-pack-business-illustrations-4632766.png" alt="Food Delivery" />
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
