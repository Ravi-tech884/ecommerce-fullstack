import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);

  const login = async (email, password) => {
    const data = await api("/auth/login", {
      method: "POST", body: JSON.stringify({ email, password })
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api("/auth/register", {
      method: "POST", body: JSON.stringify({ name, email, password })
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product === product._id);
      if (existing) {
        return prev.map(item => item.product === product._id
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.countInStock) }
          : item);
      }
      return [...prev, {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: Math.min(quantity, product.countInStock)
      }];
    });
  };

  const updateCart = (id, quantity) => {
    setCart(prev => prev.map(item => item.product === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.product !== id));

  const toggleWishlist = (product) => {
    setWishlist(prev => prev.some(item => item._id === product._id)
      ? prev.filter(item => item._id !== product._id)
      : [...prev, product]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    user, cart, wishlist, cartCount, cartTotal,
    login, register, logout, addToCart, updateCart, removeFromCart, toggleWishlist
  }), [user, cart, wishlist, cartCount, cartTotal]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
