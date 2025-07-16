import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <p>Type: {product.type}</p>
        <p>Seller Contact: {product.phone}</p>
      </div>
    </div>
  );
}
