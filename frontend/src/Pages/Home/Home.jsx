import React, { useState } from "react";
import "./Home.css";

import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="home-page">

      {/* ⭐ Hero Header */}
      <Header />

      {/* 🍽️ Category Menu */}
      <div className="section-wrapper">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* 🍔 Food Items (Filtered) */}
      <div className="section-wrapper">
        <FoodDisplay category={category} />
      </div>

      {/* 📱 Download App Section */}
      <div className="section-wrapper">
        <AppDownload />
      </div>

    </div>
  );
};

export default Home;
