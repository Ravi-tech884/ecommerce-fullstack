import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { cart, cartTotal, updateCart, removeFromCart } = useApp();

  if (!cart.length) return <div className="empty"><h1>Your cart is empty</h1><Link className="button-link" to="/">Continue shopping</Link></div>;

  return (
    <section>
      <h1>Your Cart</h1>
      <div className="cart-layout">
        <div className="list">
          {cart.map(item => (
            <div className="cart-item" key={item.product}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString("en-IN")}</p>
                <div className="qty">
                  <button onClick={() => updateCart(item.product, Math.max(1, item.quantity - 1))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCart(item.product, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="danger-text" onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>₹{cartTotal.toLocaleString("en-IN")}</strong></div>
          <div><span>Shipping</span><strong>Free</strong></div>
          <hr />
          <div><span>Total</span><strong>₹{cartTotal.toLocaleString("en-IN")}</strong></div>
          <Link className="button-link" to="/checkout">Proceed to checkout</Link>
        </aside>
      </div>
    </section>
  );
}
