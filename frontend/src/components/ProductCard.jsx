import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const saved = wishlist.some(item => item._id === product._id);

  return (
    <article className="card product-card">
      <button className={`heart ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(product)} aria-label="Wishlist">
        {saved ? "♥" : "♡"}
      </button>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <Link className="product-title" to={`/product/${product._id}`}>{product.name}</Link>
        <p className="rating">★ {product.rating.toFixed(1)}</p>
        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <button disabled={product.countInStock < 1} onClick={() => addToCart(product)}>
            {product.countInStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
