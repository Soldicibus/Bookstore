import React from "react";
import "../mainpage_cabinet/HomePage.css"; // Reuse styles from the main page for the header

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">
            <img src="/misc/EKnyga Logo.png" alt="Logo" />
          </span>
          <span className="logo-text">EKnyha</span>
        </div>

        <div className="search">
          <input type="text" placeholder="Я шукаю..." />
          <button>Знайти</button>
        </div>

        <div className="header-icons">
          <button className="cart-btn">🔔</button>
          <button className="cart-btn">🤍</button>
          <button className="cart-btn">Кошик</button>
        </div>
      </div>
    </header>
  );
}
