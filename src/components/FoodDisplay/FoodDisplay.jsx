import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../Fooditem/FoodItem";

const FoodDisplay = ({ category, onItemClick }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFoods =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You 🍽️</h2>

      <div className="food-list">
        {filteredFoods && filteredFoods.length > 0 ? (
          filteredFoods.map((item, index) => (
            <FoodItem key={index} item={item} onItemClick={onItemClick} />
          ))
        ) : (
          <p className="no-results">No dishes found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;

