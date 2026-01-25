import React from 'react';
import './ServiceTiles.css';

const ServiceTiles = ({ onClick }) => {
    const services = [
        { id: 1, title: "Food Delivery", icon: "🍔", description: "Order from top restaurants with lightning-fast delivery to your doorstep.", color: "#FFF4EE", badge: "Fast" },
        { id: 2, title: "Instamart", icon: "🛒", description: "Get groceries and daily essentials in 10 minutes. 5000+ products available.", color: "#F0F9FF", badge: "10 mins" },
        { id: 3, title: "Genie", icon: "🧞", description: "Anything picked up & dropped off. From chargers to medicines, we do it all.", color: "#F5F3FF", badge: "Helper" },
        { id: 4, title: "Dineout", icon: "🍽️", description: "Save up to 50% on bills at 10,000+ premium restaurants across the city.", color: "#FFF1F2", badge: "Offer" },
        { id: 5, title: "Minis", icon: "🏷️", description: "Unique local brands and curated shops for your special gifting needs.", color: "#F0FDF4", badge: "Local" }
    ];

    return (
        <div className="service-tiles-section">
            <div className="service-grid">
                {services.map((s) => (
                    <div key={s.id} className="service-card" style={{ background: s.color }} onClick={() => onClick(s)}>
                        <div className="service-icon">{s.icon}</div>
                        <div className="service-info">
                            <h3>{s.title}</h3>
                            <p>{s.description.substring(0, 30)}...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ServiceTiles;
