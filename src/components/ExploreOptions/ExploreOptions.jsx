import React from 'react';
import './ExploreOptions.css';

const ExploreOptions = () => {
    const categories = [
        {
            title: "Popular cuisines near me",
            items: ["Bakery food near me", "Beverages food near me", "Biryani food near me", "Burger food near me", "Chinese food near me", "Desserts food near me", "Ice Cream food near me", "Mughlai food near me", "North Indian food near me", "Pizza food near me", "Sandwich food near me", "South Indian food near me", "Street food near me"]
        },
        {
            title: "Popular restaurant types near me",
            items: ["Bakeries near me", "Bars near me", "Beverage Shops near me", "Cafes near me", "Casual Dining near me", "Confectioneries near me", "Dessert Parlors near me", "Dhabas near me", "Fine Dining near me", "Food Courts near me", "Food Trucks near me", "Kiosks near me", "Lounges near me", "Quick Bites near me", "Sweet Shops near me"]
        },
        {
            title: "Top Restaurant Chains",
            items: ["Bikanervala", "Burger King", "Burger Singh", "Domino's", "KFC", "Krispy Kreme", "McDonald's", "Pizza Hut", "SAGAR RATNA", "Subway", "WOW! Momo"]
        },
        {
            title: "Cities We Deliver To",
            items: ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Kochi", "Coimbatore", "Lucknow", "Nagpur", "Vadodara", "Indore", "Guwahati", "Vizag", "Surat", "Kanpur"]
        }
    ];

    return (
        <div className="explore-options">
            <div className="section-header">
                <h2>Explore options near me</h2>
            </div>
            <div className="options-grid">
                {categories.map((cat, index) => (
                    <div className="option-card" key={index}>
                        <div className="option-header">
                            <h3>{cat.title}</h3>
                            <span className="arrow">▼</span>
                        </div>
                        <div className="option-content">
                            <div className="chip-container">
                                {cat.items.map((item, idx) => (
                                    <span key={idx} className="dot-item">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreOptions;
