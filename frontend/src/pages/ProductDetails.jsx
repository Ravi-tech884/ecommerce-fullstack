import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/AppContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/products/${id}`).then(setProduct).catch(err => setError(err.message));
  }, [id]);

  if (error) return <div className="empty"><h2>{error}</h2><Link to="/">Back to shop</Link></div>;
  if (!product) return <p className="muted">Loading...</p>;

  const saved = wishlist.some(item => item._id === product._id);

  return (
    <section className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="rating">★ {product.rating.toFixed(1)} · {product.countInStock} in stock</p>
        <h2>₹{product.price.toLocaleString("en-IN")}</h2>
        <p className="description">{product.description}</p>
        <div className="qty">
          <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(q => Math.min(product.countInStock, q + 1))}>+</button>
        </div>
        <div className="actions">
          <button disabled={!product.countInStock} onClick={() => addToCart(product, qty)}>Add to cart</button>
          <button className="secondary" onClick={() => toggleWishlist(product)}>
            {saved ? "Remove wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>
    </section>
  );
}
