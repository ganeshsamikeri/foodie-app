import React, { useRef } from 'react';
import './TopBrands.css';

const TopBrands = ({ onClick }) => {
    const listRef = useRef(null);

    const scroll = (direction) => {
        if (listRef.current) {
            const { scrollLeft, clientWidth } = listRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            listRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    const brands = [
        { id: 1, name: "Pizza Hut", title: "Pizza Hut", category: "Pizzas, Beverages", rating: "4.2", time: "30-35 mins", image: "https://logos-world.net/wp-content/uploads/2020/05/Pizza-Hut-Logo.png", description: "World-famous pizzas with a variety of crusts and toppings. Perfect for sharing with friends and family." },
        { id: 2, name: "KFC", title: "KFC", category: "Burgers, Fried Chicken", rating: "4.1", time: "25-30 mins", image: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png", description: "Finger Lickin' Good fried chicken, burgers, and sides. CRISPY and fresh every time." },
        { id: 3, name: "McDonald's", title: "McDonald's", category: "American, Fast Food", rating: "4.3", time: "20-25 mins", image: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png", description: "The iconic Big Mac, world-famous fries, and happy meals. Fast, reliable, and delicious." },
        { id: 4, name: "Burger King", title: "Burger King", category: "Burgers, American", rating: "4.0", time: "35-40 mins", image: "https://logos-world.net/wp-content/uploads/2020/05/Burger-King-Logo.png", description: "Flame-grilled burgers that taste better. Home of the Whopper!" },
        { id: 5, name: "Subway", title: "Subway", category: "Healthy, Salads", rating: "4.4", time: "25-30 mins", image: "https://logos-world.net/wp-content/uploads/2020/04/Subway-Logo.png", description: "Freshly made subs, wraps, and salads. Choose your bread, veggies, and sauces just the way you like." },
        { id: 6, name: "Starbucks", title: "Starbucks", category: "Coffee, Desserts", rating: "4.5", time: "15-20 mins", image: "https://logos-world.net/wp-content/uploads/2020/09/Starbucks-Logo.png", description: "Premium coffee, handcrafted beverages, and delicious snacks. Your third place for community and craft." },
        { id: 7, name: "Domino's", title: "Domino's", category: "Pizzas, Italian", rating: "4.2", time: "30 mins", image: "https://logos-world.net/wp-content/uploads/2020/05/Dominos-Pizza-Logo.png", description: "Hot and fresh pizzas delivered in 30 minutes. Always better together." }
    ];

    return (
        <div className="top-brands-section">
            <div className="section-header">
                <h2>Top brand chains in your city</h2>
                <div className="scroll-controls">
                    <span onClick={() => scroll("left")}>←</span>
                    <span onClick={() => scroll("right")}>→</span>
                </div>
            </div>
            <div className="brands-container" ref={listRef}>
                {brands.map((brand) => (
                    <div key={brand.id} className="brand-card" onClick={() => onClick(brand)}>
                        <div className="brand-img-wrapper">
                            <img src={brand.image} alt={brand.name} />
                        </div>
                        <h3>{brand.name}</h3>
                        <div className="brand-meta">
                            <span className="rating-star">★ {brand.rating}</span>
                            <span className="delivery-time">• {brand.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="section-divider" />
        </div>
    );
};


export default TopBrands;
