import React from 'react';
import './Features.css';
import { FaTruck, FaLeaf, FaCreditCard, FaHeadset } from 'react-icons/fa';

const Features = () => {
    const featureList = [
        {
            icon: <FaTruck />,
            title: "Super Fast Delivery",
            desc: "Get your food in less than 30 minutes at your doorstep."
        },
        {
            icon: <FaLeaf />,
            title: "Fresh & Healthy",
            desc: "We use only the freshest ingredients for every single meal."
        },
        {
            icon: <FaCreditCard />,
            title: "Easy Payments",
            desc: "Pay easily using UPI, Cards or Cash on delivery."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            desc: "Dedicated support team to help you with any issues."
        }
    ];

    return (
        <div className="features-section">
            <div className="features-container">
                {featureList.map((f, index) => (
                    <div className="feature-card" key={index}>
                        <div className="feature-icon">{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
