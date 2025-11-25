                                                                                          import React, { useState } from "react";
import { loginAdmin } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // IMPORTANT: send FormData (NOT JSON)
      const fd = new FormData();
      fd.append("username", form.username);
      fd.append("password", form.password);

      const res = await loginAdmin(fd);

      localStorage.setItem("admin", JSON.stringify(res));
      navigate("/admin/menu");
    } catch (err) {
      alert("Invalid username or password");
    }

    setLoading(false);
  }

  return (
    <div className="admin-wrap">
      <form className="admin-card" onSubmit={submit}>
        <h2>Admin Login</h2>
        <p>Enter your credentials to manage the menu.</p>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="admin-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
