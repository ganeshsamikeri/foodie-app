import React, { useState } from 'react';
import './Orders.css';
import { FaBox, FaArrowRight, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Orders = () => {
  // Simulated data
  const [orders, setOrders] = useState([
    { _id: "65a123", user: "John Doe", items: 3, amount: 1250, status: "Food Processing", date: "Jan 25, 2026" },
    { _id: "65a124", user: "Alice Smith", items: 1, amount: 450, status: "Out for delivery", date: "Jan 25, 2026" },
    { _id: "65a125", user: "Mike Johnson", items: 2, amount: 890, status: "Delivered", date: "Jan 24, 2026" },
  ]);

  const statusHandler = (event, orderId) => {
    toast.success("Order status updated!");
  };

  return (
    <div className='orders-view animate-zoom'>
      <div className="view-header">
        <h1>Recent Orders</h1>
        <p>Manage and track all customer orders</p>
      </div>

      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item-admin'>
            <div className="order-icon-wrapper">
               <FaBox />
            </div>
            
            <div className="order-details-admin">
               <p className='order-item-food'>
                 {order.user} • {order.items} Items
               </p>
               <p className='order-item-name'>Order ID: #{order._id}</p>
               <div className='order-item-address'>
                  <p>123, Street Name,</p>
                  <p>City, State, 110011</p>
               </div>
               <p className='order-item-phone'>+91 9876543210</p>
            </div>

            <div className="order-summary-admin">
               <p className="order-date">{order.date}</p>
               <p className="order-amount">₹{order.amount.toLocaleString()}</p>
            </div>

            <div className="order-actions-admin">
               <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
               </select>
               <button className="confirm-btn"><FaCheck /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
