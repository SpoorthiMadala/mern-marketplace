import './Home.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p._id} className="product-card">
          <img src={p.imageUrl} alt={p.name} />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>Type: {p.type}</p>
          <p>Seller Contact: {p.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
