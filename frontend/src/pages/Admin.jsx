import { useEffect, useState } from "react";
import { api } from "../api";

const blank = { name: "", description: "", price: "", image: "", category: "", countInStock: 10, rating: 4.5 };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [p, o] = await Promise.all([api("/products"), api("/orders")]);
      setProducts(p); setOrders(o);
    } catch (err) { setError(err.message); }
  };
  useEffect(() => { load(); }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      const body = { ...form, price: Number(form.price), countInStock: Number(form.countInStock), rating: Number(form.rating) };
      if (editing) await api(`/products/${editing}`, { method: "PUT", body: JSON.stringify(body) });
      else await api("/products", { method: "POST", body: JSON.stringify(body) });
      setForm(blank); setEditing(null); load();
    } catch (err) { setError(err.message); }
  };

  const edit = p => {
    setEditing(p._id);
    setForm({ name:p.name, description:p.description, price:p.price, image:p.image, category:p.category, countInStock:p.countInStock, rating:p.rating });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async id => {
    if (!confirm("Delete this product?")) return;
    try { await api(`/products/${id}`, { method: "DELETE" }); load(); }
    catch (err) { setError(err.message); }
  };

  const status = async (id, value) => {
    try { await api(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status:value }) }); load(); }
    catch (err) { setError(err.message); }
  };

  return (
    <section>
      <div className="admin-head"><div><p className="eyebrow">ADMIN CONSOLE</p><h1>Store dashboard</h1></div></div>
      {error && <p className="alert">{error}</p>}

      <form className="admin-form" onSubmit={submit}>
        <h2>{editing ? "Edit product" : "Add product"}</h2>
        <div className="two-col">
          {[
            ["name","Product name"],["price","Price"],["image","Image URL"],["category","Category"],["countInStock","Stock"],["rating","Rating"]
          ].map(([key,label]) => <label key={key}>{label}<input required value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} /></label>)}
        </div>
        <label>Description<textarea required value={form.description} onChange={e => setForm({...form,description:e.target.value})} /></label>
        <button>{editing ? "Update product" : "Add product"}</button>
        {editing && <button type="button" className="secondary" onClick={() => {setEditing(null);setForm(blank)}}>Cancel</button>}
      </form>

      <h2>Products</h2>
      <div className="admin-table">
        {products.map(p => <div className="admin-row" key={p._id}>
          <span>{p.name}</span><span>₹{p.price}</span><span>{p.countInStock} stock</span>
          <span><button onClick={() => edit(p)}>Edit</button><button className="danger" onClick={() => remove(p._id)}>Delete</button></span>
        </div>)}
      </div>

      <h2>Orders</h2>
      <div className="admin-table">
        {orders.map(o => <div className="admin-row" key={o._id}>
          <span>#{o._id.slice(-8)} · {o.user?.email}</span><strong>₹{o.total}</strong>
          <select value={o.status} onChange={e => status(o._id, e.target.value)}>
            {["Placed","Processing","Shipped","Delivered","Cancelled"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>)}
      </div>
    </section>
  );
}
