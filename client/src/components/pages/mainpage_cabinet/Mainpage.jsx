import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">📖</span>
          <span className="logo-text">EKnyha</span>
        </div>

        <button className="catalog-btn">☰ Каталог</button>

        <div className="search">
          <input type="text" placeholder="Я шукаю..." />
          <button>Знайти</button>
        </div>

        <div className="header-icons">
          <span>🔔</span>
          <span>🤍</span>
          <button className="cart-btn">Кошик</button>
        </div>
      </header>

      {/* BODY */}
      <div className="body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <h3>Категорії</h3>
          <ul>
            <li>Детектив</li>
            <li>Роман</li>
            <li>Наукова фантастика</li>
            <li>Пригодницька</li>
            <li>Жахи / Хоррор</li>
            <li>Комедія</li>
            <li>Художня література</li>
            <li>Поезія</li>
            <li>Драма</li>
            <li>Історичні</li>
            <li>Дитячі</li>
            <li>Філософська</li>
            <li>Соціологічна</li>
            <li>Графічний роман</li>
            <li>Манга</li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content">
          <Section title="Акції на сьогодні:" />
          <Section title="Рекомендації на основі ваших переглядів" />
          <Section title="Найкращі пропозиції для вас" />
        </main>
      </div>
    </div>
  );
}

function Section({ title }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>
        <a href="/">Всі акції →</a>
      </div>
      <div className="section-box"></div>
    </div>
  );
}