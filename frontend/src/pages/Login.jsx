import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/");
    } catch (err) { setError(err.message); }
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <p className="eyebrow">WELCOME BACK</p>
      <h1>Sign in</h1>
      {error && <p className="alert">{error}</p>}
      <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></label>
      <label>Password<input type="password" required value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></label>
      <button>Login</button>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </form>
  );
}
