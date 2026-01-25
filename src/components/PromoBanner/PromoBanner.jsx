import React from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
    return (
        <div className="promo-banner-container">
            <div className="promo-banner">
                <div className="promo-text">
                    <span className="promo-badge">NEW</span>
                    <h2>Get the best of <br/><span>Foodie One</span></h2>
                    <p>Unlock Free Delivery, extra discounts and much more with our premium membership.</p>
                    <button className="promo-btn">Join Now • ₹99</button>
                </div>
                <div className="promo-image">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/food-delivery-boy-on-scooter-illustration-download-in-svg-png-gif-formats--courier-service-professional-man-pack-human-illustrations-4545398.png" alt="Delivery" />
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
