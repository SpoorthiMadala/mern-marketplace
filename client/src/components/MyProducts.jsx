import { useEffect, useState } from "react";
import axios from "axios";
import './MyProduct.css';
const MyProducts = () => {
  const [products, setProducts] = useState([]);
const API_BASE = process.env.REACT_APP_API_URL;


const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_BASE}/products/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  setProducts(res.data);
};

const handleDelete = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${API_BASE}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter((product) => product._id !== id));
  } catch (err) {
    alert("Error deleting product");
  }
};

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchProducts();
}, [fetchProducts]);


  return (
    <div>
      <h2>My Products</h2>
      <div className="product-list">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.imageUrl} alt={p.name} width={200} />
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Type: {p.type}</p>
            <p>Phone: {p.phone}</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
