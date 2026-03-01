import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../../hooks/books";
import "./FavoriteBooks.css";

export default function FavoriteBooks() {
  const navigate = useNavigate();
  const { data: books = [], isLoading } = useBooks();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFavorite = (bookId) => {
    setFavorites(prevFavs => {
      const newFavs = prevFavs.includes(bookId)
        ? prevFavs.filter(id => id !== bookId)
        : [...prevFavs, bookId];
      
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const favoriteBooks = books.filter(book => favorites.includes(book.id));

  if (isLoading) {
    return <div className="favorites-container">Завантаження...</div>;
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Мої улюблені книги</h1>
        <p className="count">Всього: {favoriteBooks.length}</p>
      </div>

      {favoriteBooks.length === 0 ? (
        <div className="empty-state">
          <p>У вас ще немає улюблених книг</p>
          <button 
            className="explore-btn"
            onClick={() => navigate("/books")}
          >
            Переглянути книги
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteBooks.map(book => (
            <div key={book.id} className="favorite-card">
              <div 
                className="card-cover"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                {book.cover_url ? (
                  <img src={book.cover_url} alt={book.title} />
                ) : (
                  <div className="placeholder">Без обкладинки</div>
                )}
              </div>
              
              <div className="card-content">
                <h3 onClick={() => navigate(`/book/${book.id}`)} className="clickable">
                  {book.title}
                </h3>
                <p className="author">{book.author || 'Невідомий автор'}</p>
                <p className="price">{book.price ? `${book.price} грн` : 'Ціна не вказана'}</p>
                
                <div className="card-actions">
                  <button 
                    className="view-btn"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    Переглянути
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => handleToggleFavorite(book.id)}
                  >
                    ♥ Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
