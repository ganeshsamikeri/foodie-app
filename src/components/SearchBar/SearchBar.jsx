import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";
import "./SearchBar.css";

const SearchBar = () => {
  const { food_list, addToCart } = useContext(StoreContext);
  const [query, setQuery] = useState("");

  const filteredItems = food_list.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (item) => {
    addToCart(item.name);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-results">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="search-item">
                <img src={item.image} alt={item.name} />

                <div className="info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <button className="add-btn" onClick={() => handleAdd(item)}>
                  Add
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
