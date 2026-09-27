import { Link, Route, Routes, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";

function Header() {
  const { user, logout, cartCount, wishlist } = useApp();
  return (
    <header className="header">
      <Link className="brand" to="/">ShopSphere</Link>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <button className="link-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-cta" to="/register">Create account</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function Protected({ children }) {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" replace />;
}

function AdminOnly({ children }) {
  const { user } = useApp();
  return user?.isAdmin ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/orders" element={<Protected><Orders /></Protected>} />
          <Route path="/admin" element={<AdminOnly><Admin /></AdminOnly>} />
        </Routes>
      </main>
      <footer>© {new Date().getFullYear()} ShopSphere · Built with React, Node.js, Express & MongoDB</footer>
    </>
  );
}
