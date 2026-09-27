import { useEffect, useState } from "react";
import { api } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    api("/orders/my").then(setOrders).catch(err => setError(err.message));
  }, []);

  return (
    <section>
      <h1>My Orders</h1>
      {error && <p className="alert">{error}</p>}
      {!orders.length ? <div className="empty"><p>No orders yet.</p></div> :
        <div className="orders">{orders.map(order => (
          <article className="order" key={order._id}>
            <div><strong>#{order._id.slice(-8).toUpperCase()}</strong><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
            <div><span>{order.items.length} item type(s)</span><strong>₹{order.total.toLocaleString("en-IN")}</strong></div>
            <span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span>
          </article>
        ))}</div>}
    </section>
  );
}
