import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) { setError(err.message); }
  };

  return (
    <form className="form-card" onSubmit={submit}>
      <p className="eyebrow">GET STARTED</p>
      <h1>Create account</h1>
      {error && <p className="alert">{error}</p>}
      <label>Name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></label>
      <label>Email<input type="email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></label>
      <label>Password<input type="password" minLength="6" required value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></label>
      <button>Create account</button>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </form>
  );
}
