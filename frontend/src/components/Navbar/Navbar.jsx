// src/components/Navbar/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // SEARCH STATES
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getCartCount, food_list, addToCart } = useContext(StoreContext);
  const cartCount = getCartCount();

  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  // Disable scroll when menu/search open
  useEffect(() => {
    document.body.style.overflow = isOpen || showSearch ? "hidden" : "auto";
  }, [isOpen, showSearch]);

  // Autofocus search input
  useEffect(() => {
    if (showSearch && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 80);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [showSearch]);

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(() => {
      const q = query.toLowerCase();

      const filtered = (food_list || [])
        .filter((item) => {
          const name = (item.name || "").toLowerCase();
          const desc = (item.description || "").toLowerCase();
          const cat = (item.category || "").toLowerCase();
          return name.includes(q) || desc.includes(q) || cat.includes(q);
        })
        .slice(0, 15);

      setTimeout(() => {
        setResults(filtered);
        setLoading(false);
      }, 250);
    }, 220);
  }, [query, food_list]);

  const handleMenuClick = (section) => {
    setMenu(section);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleChipClick = (chip) => setQuery(chip);

  return (
    <>
      {(isOpen || isProfileOpen) && (
        <div
          className="overlay"
          onClick={() => {
            setIsOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}

      {/* NAVBAR */}
      <div className={`navbar ${showSearch ? "hide" : ""}`}>
        <Link to="/" className="navbar-title" onClick={() => handleMenuClick("home")}>
          FOODIE
        </Link>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* MENU LIST */}
        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li
            className={menu === "home" ? "active" : ""}
            onClick={() => handleMenuClick("home")}
          >
            <Link to="/">Home</Link>
          </li>

          <li
            className={menu === "menu" ? "active" : ""}
            onClick={() => handleMenuClick("menu")}
          >
            <Link to="/menu">Menu</Link>
          </li>

          <li
            className={menu === "mobile-app" ? "active" : ""}
            onClick={() => handleMenuClick("mobile-app")}
          >
            <Link to="/mobile-app">Mobile App</Link>
          </li>

          <li
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => handleMenuClick("contact-us")}
          >
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="navbar-right">

          {/* Search Icon */}
          <img
            src={assets.search_icon}
            className="nav-icon"
            onClick={() => setShowSearch(true)}
          />

          {/* Cart */}
          <Link to="/cart" className="navbar-search-icon">
            <img src={assets.basket_icon} alt="cart" />
            {cartCount > 0 && <div className="dot">{cartCount}</div>}
          </Link>

          {/* Login / Profile */}
          {!user ? (
            <button className="signin-btn" onClick={onLoginClick}>
              Sign In
            </button>
          ) : (
            <div className="profile-container">
              <div
                className="profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img src={assets.avatar} alt="" />
              </div>

              <div className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}>
                <div className="pd-header">
                  <img src={assets.avatar} className="pd-avatar" alt="" />
                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>
                </div>

                <Link to="/orders" className="pd-item">Orders</Link>
                <Link to="/settings" className="pd-item">Settings</Link>

                <button className="pd-logout" onClick={onLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <div className={`swiggy-search-wrapper ${showSearch ? "open" : ""}`}>
        <div className="swiggy-search-bar">
          <img src={assets.search_icon} className="swiggy-search-icon" />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search for restaurants and food…"
            className="swiggy-input"
          />

          <button className="swiggy-close" onClick={() => setShowSearch(false)}>
            ✕
          </button>
        </div>

        <div className="swiggy-search-body">
          <p className="search-title">Popular Cuisines</p>

          <div className="search-chips">
            {["Biryani", "Pizza", "Burgers", "Dosa", "Ice Cream", "Sushi"].map(
              (c) => (
                <span key={c} onClick={() => handleChipClick(c)}>
                  {c}
                </span>
              )
            )}
          </div>

          <p className="search-title">Results</p>

          {loading ? (
            <div className="shimmer-list">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="shimmer-item" key={i}>
                  <div className="shimmer-thumb" />
                  <div className="shimmer-lines">
                    <div className="shimmer-line short" />
                    <div className="shimmer-line long" />
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 && query.trim() ? (
            <div className="no-results">No results for “{query}”</div>
          ) : results.length === 0 ? (
            <div className="hint-text">Try searching for Pizza, Biryani, Burger…</div>
          ) : (
            <div className="search-items">
              {results.map((item) => (
                <div key={item._id} className="search-item">
                  <img src={item.image} alt={item.name} />

                  <div className="search-item-info">
                    <div className="si-row">
                      <strong>{item.name}</strong>
                      <span className="price">₹{Number(item.price).toFixed(0)}</span>
                    </div>
                    <div className="si-row small">{item.description}</div>
                    <div className="si-row small muted">
                      Rating: {item.rating ?? "—"}
                    </div>
                  </div>

                  <button className="add-btn" onClick={() => addToCart(item._id)}>
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
