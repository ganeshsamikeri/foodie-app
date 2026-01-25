import React, { useState } from 'react';
import './List.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const List = () => {
  // Simulated data
  const [list, setList] = useState([
    { _id: "1", name: "Greek salad", price: 12, category: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100" },
    { _id: "2", name: "Chicken Rolls", price: 20, category: "Rolls", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100" },
    { _id: "3", name: "Lasagna Rolls", price: 14, category: "Rolls", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100" },
    { _id: "4", name: "Vegan Sandwich", price: 18, category: "Sandwich", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=100" },
    { _id: "5", name: "Bread Sandwich", price: 24, category: "Sandwich", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100" },
  ]);

  const removeFood = (id) => {
    setList(list.filter(item => item._id !== id));
    toast.success("Food item removed");
  };

  return (
    <div className='list-view animate-zoom'>
      <div className="view-header">
        <h1>All Food Items</h1>
        <p>Manage and monitor your menu entries</p>
      </div>

      <div className="list-table">
        <div className="list-table-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-row'>
            <img src={item.image} alt="" />
            <p className='item-name'>{item.name}</p>
            <p className='item-cat'>{item.category}</p>
            <p className='item-price'>₹{item.price}</p>
            <div className="action-btns">
               <button className="edit-icon"><FaEdit /></button>
               <button onClick={() => removeFood(item._id)} className='delete-icon'><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
