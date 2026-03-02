import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "../../../hooks/books";
import { useFavoriteBooks, useRemoveFavorites } from "../../../hooks/books";
import { useAuth } from "../../../hooks/users";
import "./FavoriteBooks.css";

export default function FavoriteBooks() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Current user in FavoriteBooks:", user);
  const { data: books = [], isLoading } = useBooks();
  const removeFavMutation = useRemoveFavorites();
  const { data: favoriteBookss = [], isLoading: isLoadingFavorites } = useFavoriteBooks(user.userId);

  var favoriteBooks = [];
  var favoriteIds = [];
  const bookarray = Object.values(favoriteBookss);
  if (bookarray.length > 0 && bookarray[0] !== null) {
    console.log("Favorite books data:", favoriteBookss);
    favoriteIds = favoriteBookss.map(fav => fav.book_id);
    favoriteBooks = books.filter(book => favoriteIds.includes(book.id));
  }
  else {
    console.log("No favorite books found for user:", user.userId);
  }

  const handleToggleFavorite = async (id) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Extract userId using helper function
    const userId = user.id || user.userId || user.sub || null;
    
    if (!userId) {
      console.error("User ID not found in user object:", user);
      alert("Помилка: не вдалося отримати ID користувача");
      return;
    }

    try {
      const isFavoriteBook = favoriteIds.includes(id);
      console.log(`Toggling favorite for book ${id} and user ${userId}. Currently favorite: ${isFavoriteBook}`);
      if (isFavoriteBook) {
        removeFavMutation.mutate({ bookId: parseInt(id), userId });
        console.log(`Removing book ${id} from favorites for user ${userId}`);
      } else {
        addFavMutation.mutate({ bookId: parseInt(id), userId });
        console.log(`Adding book ${id} to favorites for user ${userId}`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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
