import React from 'react';
import './Reviews.css';

const Reviews = () => {
    const reviews = [
        { id: 1, name: "Rahul S.", rating: 5, text: "The delivery was so fast! The food was piping hot when it arrived. Great experience.", avatar: "https://xsgames.co/randomusers/assets/avatars/male/1.jpg" },
        { id: 2, name: "Ananya K.", rating: 5, text: "Absolutely loved the variety. The UI is so smooth and finding my favorite restaurants was easy.", avatar: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg" },
        { id: 3, name: "Vikram R.", rating: 4, text: "Good service and great offers. The combo deals are really worth it.", avatar: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg" }
    ];

    return (
        <div className="reviews-section">
            <div className="section-header">
                <h2>What our customers say</h2>
            </div>
            <div className="reviews-grid">
                {reviews.map((r) => (
                    <div key={r.id} className="review-card">
                        <div className="review-header">
                            <img src={r.avatar} alt={r.name} className="reviewer-avatar" />
                            <div className="reviewer-info">
                                <h4>{r.name}</h4>
                                <div className="review-stars">{"★".repeat(r.rating)}</div>
                            </div>
                        </div>
                        <p className="review-text">"{r.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
