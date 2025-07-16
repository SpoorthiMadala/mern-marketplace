import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './AddProduct.css'

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    type: "sale", // default to sale
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!product.name || !product.price || !product.phone || !product.image) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("type", product.type);
      formData.append("phone", product.phone);
      formData.append("image", product.image);

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        type: "sale",
        phone: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding product!");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>

        <div>
          <label>Price (₹):</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>

        <div>
          <label>Type:</label>
          <select name="type" value={product.type} onChange={handleChange}>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <label>Seller Phone Number:</label>
          <input type="text" name="phone" value={product.phone} onChange={handleChange} />
        </div>

        <div>
          <label>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
