import React, { useEffect, useState } from "react";
import "./StyledMenu.css";
import { getMenu } from "../api/api"; 
import { useNavigate } from "react-router-dom";

const WOOD_BG = "/images/logo.jpg";

function MenuItemRow({ item, onAdd }) {
  return (
    <li className="menu-row">
      <div className="left-block">
        <div className="dish">{item.name}</div>
        {item.description && <div className="desc">{item.description}</div>}
      </div>

      <div className="leader" aria-hidden="true" />

      <div className="right-block">
        <div className="price">₹{item.price}</div>
        <button className="add-btn" onClick={() => onAdd(item)}>+</button>
      </div>
    </li>
  );
}

export default function StyledMenu() {
  const [grouped, setGrouped] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getMenu();

        // Fix image URLs for backend (/uploads)
        data.forEach(it => {
          if (it.imageUrl && !it.imageUrl.startsWith("http")) {
            it.imageUrl = `http://localhost:8000${it.imageUrl}`;
          }
        });

        const g = data.reduce((acc, it) => {
          const cat = it.category || "Main";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(it);
          return acc;
        }, {});

        setGrouped(g);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    }

    load();
  }, []);

  function addToCart(item) {
    const prev = JSON.parse(localStorage.getItem("cart") || "[]");
    const found = prev.find((p) => p.id === item.id);

    if (found) found.qty++;
    else prev.push({ id: item.id, name: item.name, price: item.price, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(prev));

    const toast = document.createElement("div");
    toast.className = "sm-toast";
    toast.innerText = `${item.name} added`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => toast.classList.remove("show"), 1200);
    setTimeout(() => toast.remove(), 1500);
  }

  return (
    <div className="styled-menu-wrap" style={{ backgroundImage: `url(${WOOD_BG})` }}>
      <div className="menu-content card">
        <header className="menu-header centered"></header>

        <main className="menu-body stacked">
          {!Object.keys(grouped).length && (
            <div className="empty-note">Loading menu…</div>
          )}

          {Object.entries(grouped).map(([category, items]) => (
            <section className="menu-section" key={category}>
              <div className="section-header overlap">
                <span className="section-line" />
                <span className="section-title">{category.toUpperCase()}</span>
                <span className="section-line" />
              </div>

              <ul className="item-list">
                {items.map((it) => (
                  <MenuItemRow key={it.id} item={it} onAdd={addToCart} />
                ))}
              </ul>
            </section>
          ))}
        </main>

        <footer className="menu-footer small">
          <div className="footer-left">Call: +91 12345 67890</div>
          <div className="footer-center">
            <button className="view-cart" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
          <div className="footer-right">www.reallygreatsite.com</div>
        </footer>
      </div>
    </div>
  );
}
