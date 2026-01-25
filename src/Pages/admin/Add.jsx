import React, { useState } from 'react';
import './Add.css';
import { FaCloudUploadAlt, FaSave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Add = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Food item added successfully!");
    setData({
      name: "",
      description: "",
      price: "",
      category: "Salad"
    });
    setImage(null);
  };

  return (
    <div className='add-view animate-zoom'>
      <div className="view-header">
        <h1>Add New Food Item</h1>
        <p>Create a new dish to display on the menu</p>
      </div>

      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" className="upload-preview" />
            ) : (
              <div className="upload-placeholder">
                <FaCloudUploadAlt />
                <span>Click to upload</span>
              </div>
            )}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="form-grid">
           <div className='add-product-name flex-col'>
              <p>Product Name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
           </div>

           <div className='add-product-price flex-col'>
              <p>Product Price (₹)</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='25' required />
           </div>

           <div className='add-category flex-col'>
              <p>Category</p>
              <select onChange={onChangeHandler} name="category" value={data.category}>
                 <option value="Salad">Salad</option>
                 <option value="Rolls">Rolls</option>
                 <option value="Deserts">Deserts</option>
                 <option value="Sandwich">Sandwich</option>
                 <option value="Cake">Cake</option>
                 <option value="Pure Veg">Pure Veg</option>
                 <option value="Pasta">Pasta</option>
                 <option value="Noodles">Noodles</option>
              </select>
           </div>
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>

        <button type='submit' className='add-btn'>
           <FaSave /> <span>ADD PRODUCT</span>
        </button>
      </form>
    </div>
  );
};

export default Add;
