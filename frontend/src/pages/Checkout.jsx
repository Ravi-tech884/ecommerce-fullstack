import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const { cart, cartTotal } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", address: "", city: "", postalCode: "", country: "India" });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (!cart.length) return navigate("/cart");
    setPlacing(true);
    try {
      await api("/orders", { method: "POST", body: JSON.stringify({ items: cart, shippingAddress: form }) });
      localStorage.setItem("cart", "[]");
      window.location.href = "/orders";
    } catch (err) {
      setError(err.message);
      setPlacing(false);
    }
  };

  return (
    <form className="checkout form-card wide" onSubmit={submit}>
      <div>
        <p className="eyebrow">CHECKOUT</p>
        <h1>Shipping details</h1>
        {error && <p className="alert">{error}</p>}
        {Object.entries(form).map(([key, value]) => (
          <label key={key}>{key === "postalCode" ? "Postal code" : key[0].toUpperCase() + key.slice(1)}
            <input required value={value} onChange={e => setForm({...form, [key]: e.target.value})} />
          </label>
        ))}
      </div>
      <aside className="summary">
        <h2>You're ordering</h2>
        <p>{cart.length} product type(s)</p>
        <h2>₹{cartTotal.toLocaleString("en-IN")}</h2>
        <button disabled={placing}>{placing ? "Placing order..." : "Place order"}</button>
      </aside>
    </form>
  );
}
