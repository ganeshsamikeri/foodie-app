import React from 'react';
import './Collections.css';

const Collections = ({ onClick }) => {
    const collections = [
        { id: 1, title: "Healthy Eating", category: "Nutrition, Fresh", badge: "Live Now", items: "12 Places", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80", description: "Discover places that serve nutritious, wholesome, and delicious meals without compromising on taste." },
        { id: 2, title: "Great Buffets", category: "Dining, Unlimited", badge: "Popular", items: "15 Places", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", description: "All-you-can-eat experiences that offer a wide variety of cuisines and dishes. Perfect for big appetites!" },
        { id: 3, title: "Pocket Friendly", category: "Budget, Best Value", badge: "Trending", items: "20 Places", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80", description: "Delicious meals that don't break the bank. Explore the best value-for-money spots in your neighborhood." },
        { id: 4, title: "Pet Friendly", category: "Outdoors, Social", badge: "New", items: "6 Places", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&q=80", description: "Enjoy a meal out with your furry friends. These restaurants welcome pets and often have special menus for them." }
    ];

    return (
        <div className="collections-section">
            <div className="section-header">
                <h2>Collections</h2>
            </div>
            <p className="section-subtitle">Explore curated lists of top restaurants, cafes, pubs, and bars in your city, based on trends</p>
            <div className="collections-grid">
                {collections.map((c) => (
                    <div key={c.id} className="collection-card" onClick={() => onClick(c)}>
                        <img src={c.image} alt={c.title} />
                        <div className="collection-overlay">
                            <h3>{c.title}</h3>
                            <span>{c.items}  <span className="arrow">▶</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Collections;
