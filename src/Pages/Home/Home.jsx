import React, { useState } from "react";
import "./Home.css";

import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import Features from "../../components/Features/Features";
import Stats from "../../components/Stats/Stats";
import Offers from "../../components/Offers/Offers";
import TopBrands from "../../components/TopBrands/TopBrands";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import Reviews from "../../components/Reviews/Reviews";
import LiveCounter from "../../components/LiveCounter/LiveCounter";
import Newsletter from "../../components/Newsletter/Newsletter";
import ExploreOptions from "../../components/ExploreOptions/ExploreOptions";
import Collections from "../../components/Collections/Collections";
import ServiceTiles from "../../components/ServiceTiles/ServiceTiles";
import DetailModal from "../../components/DetailModal/DetailModal";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [modalData, setModalData] = useState(null);

  const openDetail = (data) => {
    setModalData(data);
  };

  return (
    <div className="home-page">
      <DetailModal 
        show={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData} 
      />

      {/* ⭐ Hero Header */}
      <Header />

      {/* 🚀 Our Services Quick Access */}
      <div className="section-wrapper animate-spring">
        <ServiceTiles onClick={openDetail} />
      </div>

      {/* 💸 Exclusive Offers Section */}
      <div className="section-wrapper animate-spring">
        <Offers onClick={openDetail} />
      </div>

      {/* 🍽️ "What's on your mind?" (Categories) */}
      <div className="section-wrapper animate-spring">
        <ExploreMenu category={category} setCategory={setCategory} />
      </div>

      {/* 🏆 Top Brands Carousel */}
      <div className="section-wrapper animate-spring">
        <TopBrands onClick={openDetail} />
      </div>

      {/* 📸 Curated Collections */}
      <div className="section-wrapper animate-spring">
        <Collections onClick={openDetail} />
      </div>

      {/* 🟢 Live Restaurant Count & Filters */}
      <div className="section-wrapper">
        <LiveCounter />
      </div>

      {/* 🍔 Restaurants / Food Items Grid */}
      <div className="section-wrapper animate-spring">
        <FoodDisplay category={category} onItemClick={openDetail} />
      </div>

      {/* 📈 Brand Stats */}
      <div className="section-wrapper">
        <Stats />
      </div>

      {/* 🎟️ Premium Banner */}
      <div className="section-wrapper animate-spring">
        <PromoBanner />
      </div>

      {/* 💬 Customer Reviews */}
      <div className="section-wrapper animate-spring">
        <Reviews />
      </div>

      {/* 🚀 Value Proposition */}
      <div className="section-wrapper">
        <Features />
      </div>

      {/* 📧 Newsletter Section */}
      <div className="section-wrapper animate-spring">
        <Newsletter />
      </div>

      {/* 🔍 SEO / Explore Options */}
      <div className="section-wrapper">
        <ExploreOptions />
      </div>

      {/* 📱 Mobile Experience */}
      <div className="section-wrapper">
        <AppDownload />
      </div>

    </div>
  );
};

export default Home;

