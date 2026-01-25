import React from 'react';
import './LiveCounter.css';

const LiveCounter = () => {
    return (
        <div className="live-counter-section">
            <div className="live-counter-container">
                <div className="live-stat">
                    <span className="live-dot"></span>
                    <p><strong>542 restaurants</strong> currently delivering to you</p>
                </div>
                <div className="filter-chips">
                    <span className="chip active">Fast Delivery</span>
                    <span className="chip">Ratings 4.0+</span>
                    <span className="chip">Pure Veg</span>
                    <span className="chip">Offers</span>
                </div>
            </div>
        </div>
    );
};

export default LiveCounter;
