import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "../styles/ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>
      <div className="seller-info">
        <p><strong>Seller:</strong> {product.sellerName}</p>
        <p><strong>Email:</strong> {product.sellerEmail}</p>
        <p><strong>Phone:</strong> {product.sellerPhone}</p>
      </div>
    </div>
  );
}
