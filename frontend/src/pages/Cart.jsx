import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  function changeQty(id, delta) {
    const c = cart.map((it) =>
      it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
    );
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  }

  function removeItem(id) {
    const c = cart.filter((it) => it.id !== id);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  }

  // ⭐ RESET CART (clear all items)
  function resetCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  const total = cart.reduce(
    (s, it) => s + (it.price || 0) * (it.qty || 1),
    0
  );

  return (
    <div className="cart-wrap">

      <header className="cart-header">
        <h1>Your Selected Items</h1>
        <p>Review what you have selected.</p>
      </header>

      {cart.length === 0 && (
        <div className="empty-cart">
          <p>Your selection is empty.</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Menu
          </button>
        </div>
      )}

      <ul className="cart-list">
        {cart.map((it) => (
          <li className="cart-item" key={it.id}>
            <div className="cart-info">
              <div className="cart-name">{it.name}</div>
              <div className="cart-price">₹{it.price}</div>
            </div>

            <div className="cart-controls">
              <button className="qty-btn" onClick={() => changeQty(it.id, -1)}>
                −
              </button>
              <span className="qty">{it.qty}</span>
              <button className="qty-btn" onClick={() => changeQty(it.id, 1)}>
                +
              </button>
              <button className="remove-btn" onClick={() => removeItem(it.id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <>
          <div className="cart-summary">
            <div className="total-label">Total</div>
            <div className="total-value">₹{total}</div>
          </div>

          {/* ⭐ RESET CART BUTTON */}
          <button className="reset-btn" onClick={resetCart}>
            Reset Cart
          </button>

          <button className="back-btn" onClick={() => navigate("/")}>
            ← Back to Menu
          </button>
        </>
      )}
    </div>
  );
}
