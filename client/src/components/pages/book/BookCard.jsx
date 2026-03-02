import { useAuthorsByBook } from "../../../hooks/books";
import { getFullAuthorName, getBookCover } from "../../../utils/bookUtils";
import React from "react";
import "./BookCard.css";

export default function BookCard({ book, navigate }) {
  const { data: authors = [], isLoading } = useAuthorsByBook(book?.id);

  const displayAuthors = () => {
    if (isLoading) {
      return <span className="loading">Завантаження авторів...</span>;
    }
    
    if (!authors || authors.length === 0) {
      return <span>Невідомий автор</span>;
    }

    return authors
      .map((author, idx) => (
        <span key={`${book.id}-author-${idx}`}>
          {getFullAuthorName(author)}
          {idx < authors.length - 1 ? ", " : ""}
        </span>
      ))
      .reduce((prev, curr, idx) => (idx === 0 ? curr : [prev, curr]), "");
  };

  return (
    <div className="book-card">
      <div 
        className="book-cover"
        onClick={() => navigate(`/book/${book?.id}`)}
      >
        <img 
          src={getBookCover(book)} 
          alt={book?.title || "Book cover"} 
          onError={(e) => {
            e.target.src = "https://images-na.ssl-images-amazon.com/images/P/B00QOQG9I2.01.L.jpg";
          }}
        />
        {book?.rating && (
          <div className="rating-badge">{book.rating.toFixed(1)} ⭐</div>
        )}
      </div>
      <div className="book-info">
        <h3 
          className="book-title"
          onClick={() => navigate(`/book/${book?.id}`)}
        >
          {book?.title || "Unknown"}
        </h3>
        
        <p className="authors">
          {displayAuthors()}
        </p>
        
        {book?.publisher && (
          <p className="publisher">Видавець: {book.publisher}</p>
        )}
        
        <p className="price">
          {book?.price ? `${book.price} грн` : "Ціна не вказана"}
        </p>
        
        <div className="book-meta">
          {book?.genres && book.genres.length > 0 && (
            <div className="genres">
              {book.genres.map(genre => (
                <span key={genre.id} className="tag genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          
          {book?.themes && book.themes.length > 0 && (
            <div className="themes">
              {book.themes.slice(0, 2).map(theme => (
                <span key={theme.id} className="tag theme-tag">
                  {theme.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className="view-details-btn"
          onClick={() => navigate(`/book/${book?.id}`)}
        >
          Переглянути деталі
        </button>
      </div>
    </div>
  );
}
