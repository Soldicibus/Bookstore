import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Genre IDs from database
const GENRES = [
  { id: 1, name: 'Детектив' },
  { id: 2, name: 'Роман' },
  { id: 3, name: 'Наукова фантастика' },
  { id: 4, name: 'Пригодницька' },
  { id: 5, name: 'Жахи / Хоррор' },
  { id: 6, name: 'Комедія' },
  { id: 7, name: 'Художня література' },
  { id: 8, name: 'Поезія' },
  { id: 9, name: 'Драма' },
  { id: 10, name: 'Історичні' },
  { id: 11, name: 'Дитячі' },
  { id: 12, name: 'Філософська' },
  { id: 13, name: 'Соціологічна' },
  { id: 14, name: 'Графічний роман' },
  { id: 15, name: 'Манга' }
];

export default function Mainpage() {
  const navigate = useNavigate();

  const handleGenreClick = (genreId) => {
    navigate(`/books?genre=${genreId}`);
  };

  return (
    <div className="layout">
      <div className="body">
        <aside className="sidebar">
          <h3>Жанри</h3>
          <ul>
            {GENRES.map(genre => (
              <li 
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className="genre-link"
                title="Натисніть, щоб переглянути книги цього жанру"
              >
                {genre.name}
              </li>
            ))}
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
        <a href="/books">Всі акції →</a>
      </div>
      <div className="section-box"></div>
    </div>
  );
}