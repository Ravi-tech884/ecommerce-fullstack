import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

export default function Wishlist() {
  const { wishlist } = useApp();
  return (
    <section>
      <h1>Wishlist</h1>
      {wishlist.length ? <div className="grid">{wishlist.map(p => <ProductCard key={p._id} product={p} />)}</div> :
        <div className="empty"><h2>Your wishlist is empty</h2><Link to="/">Browse products</Link></div>}
    </section>
  );
}
