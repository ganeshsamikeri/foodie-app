import React, { useContext } from "react";
import "./DetailModal.css";
import { StoreContext } from "../../context/StoreContext";
import { FaStar, FaClock, FaTag, FaPlus, FaMinus } from "react-icons/fa";

const DetailModal = ({ show, onClose, data }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  
  if (!show || !data) return null;

  const isFoodItem = !!data.price && !!data.name && !data.title; 
  const itemName = data.name || data.title;
  const quantity = isFoodItem ? (cartItems[itemName] || 0) : 0;

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal-content animate-zoom" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal-close" onClick={onClose}>✕</button>
        
        <div className="detail-modal-scrollable">
          {data.image && (
            <div className="detail-modal-image">
              <img src={data.image} alt={data.name || data.title} />
              <div className="image-overlay-bottom"></div>
              {data.badge && <span className="detail-badge">{data.badge}</span>}
            </div>
          )}

          <div className="detail-modal-body">
            <div className="title-section">
              <div className="title-top">
                <h2>{data.name || data.title}</h2>
                {isFoodItem && <div className="veg-icon-wrapper"><div className="veg-icon"></div></div>}
              </div>
              {data.category && <span className="detail-category">{data.category}</span>}
            </div>
            
            <div className="detail-info-grid">
              {data.price && (
                <div className="info-item">
                  <label><FaTag /> Price</label>
                  <p>₹{data.price}</p>
                </div>
              )}
              {data.rating && (
                <div className="info-item">
                  <label><FaStar /> Rating</label>
                  <p>{data.rating}</p>
                </div>
              )}
              {data.time && (
                <div className="info-item">
                  <label><FaClock /> Delivery</label>
                  <p>{data.time.split(' ')[0]}<span> mins</span></p>
                </div>
              )}
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{data.description || data.desc || "Experience the best quality and taste. We ensure every item meets the highest standards of hygiene and flavor."}</p>
            </div>

            <div className="detail-footer">
              {isFoodItem ? (
                <div className="modal-cart-actions">
                  {quantity === 0 ? (
                    <button className="modal-add-btn" onClick={() => addToCart(itemName)}>
                      ADD TO CART <span>₹{data.price}</span>
                    </button>
                  ) : (
                    <div className="modal-qty-control">
                      <button onClick={() => removeFromCart(itemName)}><FaMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={() => addToCart(itemName)}><FaPlus /></button>
                    </div>
                  )}
                </div>
              ) : (
                <button className="btn-done" onClick={onClose}>Got it</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DetailModal;

