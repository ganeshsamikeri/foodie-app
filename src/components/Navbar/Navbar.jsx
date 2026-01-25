import React, { useState, useContext, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <div className={`navbar ${showSearch ? "hide" : ""} ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <Link
            to="/"
            className="navbar-title"
            onClick={() => handleMenuClick("home")}
          >
            FOODIE
          </Link>
          <div className="navbar-divider"></div>
          <div className="location-selector">
            <span className="location-type">Other</span>
            <span className="location-name">Mumbai, Maharashtra, India</span>
            <span className="location-arrow">▼</span>
          </div>
        </div>




        {/* Menu */}
        <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <li
            className={menu === "menu" ? "active" : ""}
            onClick={() => handleMenuClick("menu")}
          >
            <Link to="/menu">MENU</Link>
          </li>
          <li
            className={menu === "offers" ? "active" : ""}
            onClick={() => handleMenuClick("offers")}
          >
            <Link to="/offers" className="menu-item-with-icon">
              <span className="offer-tag-icon">🏷️</span> OFFERS
            </Link>
          </li>
          <li
            className={menu === "contact-us" ? "active" : ""}
            onClick={() => handleMenuClick("contact-us")}
          >
            <Link to="/contact-us">HELP</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          <div className="nav-icon-wrapper" onClick={() => setShowSearch(true)}>
            <img src={assets.search_icon} className="nav-icon" alt="Search" />
            <span className="nav-label">Search</span>
          </div>

          <Link to="/cart" className="nav-icon-wrapper">
            <div className="cart-icon-container">
              <img src={assets.basket_icon} className="nav-icon" alt="Cart" />
              {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
            <span className="nav-label">Cart</span>
          </Link>

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
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="pd-user">
                    <strong>{user?.name}</strong>
                    <p>{user?.email}</p>
                  </div>
                  
                  <Link to="/profile" className="pd-link" onClick={() => setIsProfileOpen(false)}>
                    👤 Profile
                  </Link>
                  <Link to="/my-orders" className="pd-link" onClick={() => setIsProfileOpen(false)}>
                    📦 My Orders
                  </Link>
                  <button className="pd-logout-btn" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </>
          )}

          {/* Hamburger */}
          <div
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
            <span />
          </div>
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
                    toast.success(`${item.name} added to search focus`);
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
              <div className="search-discovery">
                <div className="discovery-section">
                  <h3>Recent Searches</h3>
                  <div className="discovery-tags">
                    <span>Pizza</span>
                    <span>Burger</span>
                    <span>Momos</span>
                    <span>Pasta</span>
                  </div>
                </div>
                <div className="discovery-section">
                  <h3>Popular Cuisines</h3>
                  <div className="cuisine-grid">
                    <div className="cuisine-item"><span className="cuisine-emoji">🍔</span> <h4>Burger</h4></div>
                    <div className="cuisine-item"><span className="cuisine-emoji">🍕</span> <h4>Pizza</h4></div>
                    <div className="cuisine-item"><span className="cuisine-emoji">🍝</span> <h4>Chinese</h4></div>
                    <div className="cuisine-item"><span className="cuisine-emoji">🍦</span> <h4>Desserts</h4></div>
                    <div className="cuisine-item"><span className="cuisine-emoji">🥘</span> <h4>North Indian</h4></div>
                    <div className="cuisine-item"><span className="cuisine-emoji">🍹</span> <h4>Beverages</h4></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;