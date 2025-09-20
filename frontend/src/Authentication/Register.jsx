import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", password: "", address: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) navigate("/login");
      else setError(data.message || "Registration failed");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

        {/* <input type="text" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required /> */}

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        {/* <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required /> */}
        <button type="submit">Register</button>
        <p className="redirect">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
