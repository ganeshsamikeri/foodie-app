import React, { useState } from "react";
import "./Menu.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

const Menu = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="menu-page no-footer">
      <h1 className="menu-title">Our Menu</h1>

      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Menu;
