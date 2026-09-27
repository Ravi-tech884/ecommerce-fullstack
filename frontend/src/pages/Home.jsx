import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { api } from "../api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/products/categories").then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      api(`/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`)
        .then(setProducts)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">SMART SHOPPING · SIMPLE EXPERIENCE</p>
          <h1>Everything you need, in one place.</h1>
          <p>Discover curated products with fast search, a simple cart and a smooth checkout experience.</p>
        </div>
      </section>

      <section className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </section>

      {error && <p className="alert">{error}</p>}
      {loading ? <p className="muted">Loading products...</p> :
        products.length ? <section className="grid">{products.map(p => <ProductCard key={p._id} product={p} />)}</section> :
        <div className="empty"><h2>No products found</h2><p>Try another search or category.</p></div>}
    </>
  );
}
