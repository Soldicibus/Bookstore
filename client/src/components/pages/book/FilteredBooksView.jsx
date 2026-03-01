import React, { useState } from "react";
import { useBooks } from "../../../hooks/books";
import { useGenres } from "../../../hooks/genres";
import { useNavigate } from "react-router-dom";
import "./FilteredBooksView.css";

export default function FilteredBooksView() {
  const navigate = useNavigate();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  const { data: genres = [], isLoading: genresLoading } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesGenre = !selectedGenre || 
      (book.genres && book.genres.some(g => g.id === selectedGenre || g.name === selectedGenre));
    
    const matchesSearch = !searchQuery || 
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGenre && matchesSearch;
  });

  const isLoading = booksLoading || genresLoading;

  if (isLoading) {
    return <div className="filtered-books-container">Завантаження...</div>;
  }

  return (
    <div className="filtered-books-container">
      <div className="filter-section">
        <h2>Фільтрування</h2>
        
        <div className="filter-group">
          <input
            type="text"
            placeholder="Пошук за назвою або автором..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <h3>Жанри</h3>
          <div className="genre-list">
            <button
              className={`genre-btn ${!selectedGenre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(null)}
            >
              Всі жанри
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="books-grid">
        <h2>Книги ({filteredBooks.length})</h2>
        {filteredBooks.length === 0 ? (
          <p>Книги не знайдені</p>
        ) : (
          <div className="books-list">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card" onClick={() => navigate(`/book/${book.id}`)}>
                <div className="book-cover">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} />
                  ) : (
                    <div className="placeholder">Без обкладинки</div>
                  )}
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author || 'Невідомий автор'}</p>
                  <p className="price">{book.price ? `${book.price} грн` : 'Ціна не вказана'}</p>
                  <div className="genres">
                    {book.genres && book.genres.map(genre => (
                      <span key={genre.id} className="genre-tag">{genre.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
