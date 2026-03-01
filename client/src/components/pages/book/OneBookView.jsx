import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook } from "../../../hooks/books";
import { useReviews } from "../../../hooks/reviews";
import { useCreateReview } from "../../../hooks/reviews";
import { useAddItemToCart } from "../../../hooks/carts";
import { useAuth } from "../../../hooks/users";
import "./OneBookView.css";

export default function OneBookView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const { data: book, isLoading: bookLoading } = useBook(id);
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();
  const createReview = useCreateReview();
  const addToCart = useAddItemToCart();
  
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const bookReviews = reviews.filter(r => r.book_id === parseInt(id) || r.bookId === parseInt(id));
  const avgRating = bookReviews.length > 0
    ? (bookReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / bookReviews.length).toFixed(1)
    : 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    try {
      // Demo: Just show a message since we need user's cart ID
      alert(`Додано ${quantity} копій "${book?.title}" до кошика`);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Помилка при додаванні до кошика");
    }
  };

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (!reviewText.trim()) {
      alert("Напишіть рецензію");
      return;
    }

    try {
      await createReview.mutateAsync({
        book_id: id,
        user_id: user?.id,
        rating,
        comment: reviewText,
      });
      
      setReviewText("");
      setRating(5);
      alert("Рецензія додана!");
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Помилка при додаванні рецензії");
    }
  };

  if (bookLoading) {
    return <div className="one-book-container">Завантаження...</div>;
  }

  if (!book) {
    return <div className="one-book-container">Книга не знайдена</div>;
  }

  return (
    <div className="one-book-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className="book-detail">
        <div className="book-cover-section">
          {book.cover_url ? (
            <img src={book.cover_url} alt={book.title} className="book-cover-large" />
          ) : (
            <div className="cover-placeholder">Без обкладинки</div>
          )}
        </div>

        <div className="book-details-section">
          <h1>{book.title}</h1>
          
          <div className="book-meta">
            {book.author && <p className="author"><strong>Автор:</strong> {book.author}</p>}
            {book.publisher && <p className="publisher"><strong>Видавництво:</strong> {book.publisher}</p>}
            {book.publication_year && <p className="year"><strong>Рік видання:</strong> {book.publication_year}</p>}
            {book.pages && <p className="pages"><strong>Сторінок:</strong> {book.pages}</p>}
            {book.isbn && <p className="isbn"><strong>ISBN:</strong> {book.isbn}</p>}
          </div>

          <div className="rating-section">
            <p className="rating">⭐ {avgRating} / 5 ({bookReviews.length} рецензій)</p>
          </div>

          <div className="price-section">
            <p className="price">{book.price ? `${book.price} грн` : 'Ціна не вказана'}</p>
          </div>

          {book.description && (
            <div className="description">
              <h3>Опис</h3>
              <p>{book.description}</p>
            </div>
          )}

          {book.genres && book.genres.length > 0 && (
            <div className="genres-section">
              <h3>Жанри</h3>
              <div className="genres-list">
                {book.genres.map(genre => (
                  <span key={genre.id} className="genre-badge">{genre.name}</span>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            <div className="quantity-selector">
              <label>Кількість:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Рецензії ({bookReviews.length})</h2>

        {isAuthenticated && (
          <div className="add-review">
            <h3>Додати рецензію</h3>
            <div className="review-form">
              <div className="rating-input">
                <label>Оцінка:</label>
                <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                  {[1, 2, 3, 4, 5].map(r => (
                    <option key={r} value={r}>{r} ⭐</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Напишіть вашу рецензію..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
              />
              <button 
                onClick={handleAddReview}
                disabled={createReview.isPending}
              >
                {createReview.isPending ? "Додавання..." : "Додати рецензію"}
              </button>
            </div>
          </div>
        )}

        {bookReviews.length === 0 ? (
          <p className="no-reviews">Рецензій ще нема</p>
        ) : (
          <div className="reviews-list">
            {bookReviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <p className="reviewer-name">{review.user_name || 'Анонімний користувач'}</p>
                  <p className="review-rating">{'⭐'.repeat(review.rating || 0)}</p>
                </div>
                <p className="review-text">{review.comment}</p>
                <p className="review-date">
                  {new Date(review.created_at).toLocaleDateString('uk-UA')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
