import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="layout">
      <div className="body">
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

        <main className="content">
          <MainSection title="Акції на сьогодні:" />
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
      </div>
      <div className="section-box"></div>
    </div>
  );
}

function MainSection({ title }) {
  return (
    <div className="MainSection">
      <div className="section-header">
        <h2>{title}</h2>
        <a href="/">Всі акції →</a>
      </div>
      <div className="section-box"></div>
    </div>
  );
}