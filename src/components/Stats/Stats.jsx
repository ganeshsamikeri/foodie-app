import React from 'react';
import './Stats.css';

const Stats = () => {
    const stats = [
        { label: "Food Items", value: "300+" },
        { label: "Active Users", value: "50k+" },
        { label: "Cities", value: "100+" },
        { label: "Deliveries", value: "1M+" }
    ];

    return (
        <div className="stats-section">
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div className="stat-item" key={index}>
                        <h2>{stat.value}</h2>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
