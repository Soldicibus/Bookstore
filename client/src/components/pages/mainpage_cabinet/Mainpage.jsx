import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../../hooks/books"; // Adjust path as needed
import BookCard from "../book/BookCard";
import "./HomePage.css";

const GENRES = [
  { id: 1, name: 'Детектив' }, { id: 2, name: 'Роман' }, 
  { id: 3, name: 'Наукова фантастика' }, { id: 4, name: 'Пригодницька' },
  { id: 5, name: 'Жахи / Хоррор' }, { id: 6, name: 'Комедія' },
  { id: 7, name: 'Художня література' }, { id: 8, name: 'Поезія' },
  { id: 9, name: 'Драма' }, { id: 10, name: 'Історичні' },
  { id: 11, name: 'Дитячі' }, { id: 12, name: 'Філософська' },
  { id: 13, name: 'Соціологічна' }, { id: 14, name: 'Графічний роман' },
  { id: 15, name: 'Манга' }
];

export default function Mainpage() {
  const navigate = useNavigate();
  
  // 1. Fetch real data from your hook
  const { data: allBooks = [], isLoading } = useBooks();

  // 2. Create randomized selections using useMemo
  // This ensures random picks only change when allBooks changes
  const sectionsData = useMemo(() => {
    if (allBooks.length === 0) return { promo: [], recs: [], best: [] };

    // Shuffling the array once
    const shuffled = [...allBooks].sort(() => 0.5 - Math.random());

    return {
      promo: shuffled.slice(0, 4),
      recs: shuffled.slice(4, 8),
      best: shuffled.slice(8, 12),
    };
  }, [allBooks]);

  const handleGenreClick = (genreId) => {
    navigate(`/books?genre=${genreId}`);
  };

  if (isLoading) {
    return <div className="loading-screen">Завантаження...</div>;
  }

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
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </aside>

        <main className="content">
          <MainSection 
            title="Акції на сьогодні:" 
            books={sectionsData.promo} 
            navigate={navigate} 
          />
          <Section 
            title="Рекомендації на основі ваших переглядів" 
            books={sectionsData.recs} 
            navigate={navigate} 
          />
          <Section 
            title="Найкращі пропозиції для вас" 
            books={sectionsData.best} 
            navigate={navigate} 
          />
        </main>
      </div>
    </div>
  );
}

// Updated Section Components to handle the map
function Section({ title, books, navigate }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="section-box">
        {books?.map(book => (
          <BookCard key={book.id} book={book} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

function MainSection({ title, books, navigate }) {
  return (
    <div className="MainSection">
      <div className="section-header">
        <h2>{title}</h2>
        <a href="/books">Всі акції →</a>
      </div>
      <div className="section-box">
        {books?.map(book => (
          <BookCard key={book.id} book={book} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}