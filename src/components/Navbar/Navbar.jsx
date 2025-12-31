import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ user, onLoginClick, onLogout }) => {
  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // SEARCH
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     CONTEXT
  ========================= */
  const { getCartCount, food_list } = useContext(StoreContext);
  const cartCount = getCartCount();

  /* =========================
     REFS
  ========================= */
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  /* =========================
     EFFECTS
  ========================= */

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow =
      isOpen || showSearch || isProfileOpen ? "hidden" : "auto";
  }, [isOpen, showSearch, isProfileOpen]);

  // Autofocus search
  useEffect(() => {
    if (showSearch && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 80);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [showSearch]);

  // Debounced search
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
          return (
            name.includes(q) ||
            desc.includes(q) ||
            cat.includes(q)
          );
        })
        .slice(0, 15);

      setResults(filtered);
      setLoading(false);
    }, 300);
  }, [query, food_list]);

  // Close profile on user change
  useEffect(() => {
    setIsProfileOpen(false);
  }, [user]);

  /* =========================
     HANDLERS
  ========================= */
  const handleMenuClick = (section) => {
    setMenu(section);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout();
    navigate("/");
  };

   /* =========================
     JSX
  ========================= */
  return (
    <>
      {(isOpen || isProfileOpen || showSearch) && (
        <div
          className="overlay"
          onClick={() => {
            setIsOpen(false);
            setIsProfileOpen(false);
            setShowSearch(false);
          }}
        />
      )}

      <div className={`navbar ${showSearch ? "hide" : ""}`}>
        <Link
          to="/"
          className="navbar-title"
          onClick={() => handleMenuClick("home")}
        >
          FOODIE
        </Link>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span />
          <span />
          <span />
        </div>

        {/* Menu */}
        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li
            className={menu === "home" ? "active" : ""}
            onClick={() => handleMenuClick("home")}
          >
            <Link to="/">HOME</Link>
          </li>
          <li
            className={menu === "menu" ? "active" : ""}
            onClick={() => handleMenuClick("menu")}
          >
            <Link to="/menu">MENU</Link>
          </li>
          <li
            className={menu === "mobile-app" ? "active" : ""}
            onClick={() => handleMenuClick("mobile-app")}
          >
            <Link to="/mobile-app">MOBILE APP</Link>
          </li>
          <li
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => handleMenuClick("contact-us")}
          >
            <Link to="/contact-us">CONTACT US</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search Icon */}
          <div className="nav-icon-wrapper" onClick={() => setShowSearch(true)}>
            <img src={assets.search_icon} className="nav-icon" alt="Search" />
          </div>

          {/* Cart Icon with badge */}
          <Link to="/cart" className="nav-icon-wrapper">
            <img src={assets.basket_icon} className="nav-icon" alt="Cart" />
            {cartCount > 0 && <div className="dot">{cartCount}</div>}
          </Link>


          {/* User Profile */}
          {!user ? (
            <button className="signin-btn" onClick={onLoginClick}>
              Sign In
            </button>
          ) : (
            <>
              <div
                className="profile-container"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="profile-initial">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="pd-user">
                    <strong>{user?.name || "User"}</strong>
                    <p className="pd-email">{user?.email || "user@example.com"}</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="pd-link"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <i className="pd-icon">👤</i> Profile
                  </Link>
                  
                  <Link 
                    to="/my-orders" 
                    className="pd-link"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <i className="pd-icon">📦</i> My Orders
                  </Link>
                  
                  <button 
                    className="pd-logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="pd-icon">🚪</i> Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-header">
            <div className="search-input-container">
              <img src={assets.search_icon} alt="Search" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for food, drinks, etc."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button 
                className="close-search"
                onClick={() => setShowSearch(false)}
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="search-results">
            {loading ? (
              <div className="loading">Searching...</div>
            ) : results.length > 0 ? (
              results.map((item) => (
                <div 
                  key={item._id} 
                  className="result-item"
                  onClick={() => {
                    navigate(`/food/${item._id}`);
                    setShowSearch(false);
                  }}
                >
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description?.substring(0, 60)}...</p>
                    <span>₹{item.price}</span>
                  </div>
                </div>
              ))
            ) : query.trim() ? (
              <div className="no-results">No results found for "{query}"</div>
            ) : (
              <div className="search-placeholder">
                <p>Search for your favorite food items</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;