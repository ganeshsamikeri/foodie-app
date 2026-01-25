import React, { useRef } from 'react';
import './Offers.css';

const Offers = ({ onClick }) => {
    const listRef = useRef(null);

    const scroll = (direction) => {
        if (listRef.current) {
            const { scrollLeft, clientWidth } = listRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            listRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const offerBanners = [
        {
            id: 1,
            title: "60% OFF",
            subtitle: "Up to ₹120",
            code: "WELCOME60",
            bg: "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)",
            description: "Get massive savings on your first 3 orders! Applicable for new users on selected restaurants."
        },
        {
            id: 2,
            title: "FREE DELIVERY",
            subtitle: "On orders above ₹199",
            code: "FREEDEL",
            bg: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
            description: "No delivery charges for order above ₹199. Enjoy hot meals delivered at your doorstep for free."
        },
        {
            id: 3,
            title: "BUY 1 GET 1",
            subtitle: "On selected desserts",
            code: "BOGO",
            bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            description: "Double the sweetness! Order any dessert from the 'BOGO' category and get another one absolutely free."
        },
        {
            id: 4,
            title: "₹100 CASHBACK",
            subtitle: "Using Amazon Pay",
            code: "AMZNPAY",
            bg: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
            description: "Pay using Amazon Pay and get up to ₹100 cashback in your Amazon wallet within 24 hours."
        }
    ];

    return (
        <div className="offers-section">
            <div className="section-header">
                <h2>Best Offers for You</h2>
                <div className="scroll-controls">
                    <span onClick={() => scroll("left")}>←</span>
                    <span onClick={() => scroll("right")}>→</span>
                </div>
            </div>
            <div className="offers-container" ref={listRef}>
                {offerBanners.map((offer) => (
                    <div 
                        key={offer.id} 
                        className="offer-card" 
                        style={{ background: offer.bg }}
                        onClick={() => onClick(offer)}
                    >
                        <div className="offer-content">
                            <span className="offer-tag">LIMITED TIME</span>
                            <h3>{offer.title}</h3>
                            <p>{offer.subtitle}</p>
                            <div className="promo-code">
                                <span>USE {offer.code}</span>
                            </div>
                        </div>
                        <div className="offer-decoration"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Offers;
