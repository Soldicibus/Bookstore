import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReviews } from "../../../hooks/reviews";
import { useAuth } from "../../../hooks/users";
import { useBooks } from "../../../hooks/books";
import "./BookReview.css";

export default function BookReview() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();
  const { data: books = [], isLoading: booksLoading } = useBooks();
  
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(null);

  const isLoading = reviewsLoading || booksLoading;

  // Get book title for a review
  const getBookTitle = (bookId) => {
    const book = books.find(b => b.id === bookId || b.id === parseInt(bookId));
    return book?.title || "Невідома книга";
  };

  // Sort reviews
  let sortedReviews = [...reviews];
  if (sortBy === "newest") {
    sortedReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sortBy === "oldest") {
    sortedReviews.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else if (sortBy === "highest") {
    sortedReviews.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === "lowest") {
    sortedReviews.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  }

  // Filter by rating
  if (filterRating) {
    sortedReviews = sortedReviews.filter(r => r.rating === filterRating);
  }

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : 0;

  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  if (isLoading) {
    return <div className="reviews-container">Завантаження...</div>;
  }

  return (
    <div className="reviews-container">
      <h1>Рецензії на книги</h1>

      <div className="reviews-content">
        <div className="reviews-sidebar">
          <div className="stats-card">
            <h3>Статистика</h3>
            <div className="overall-rating">
              <div className="rating-number">{avgRating}</div>
              <div className="rating-stars">
                {'⭐'.repeat(Math.round(avgRating))}
              </div>
              <p className="total-reviews">Всього рецензій: {totalReviews}</p>
            </div>

            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="distribution-row">
                  <span>{rating} ⭐</span>
                  <div className="bar">
                    <div 
                      className="fill"
                      style={{ width: `${(ratingDistribution[rating] / Math.max(...Object.values(ratingDistribution), 1)) * 100}%` }}
                    ></div>
                  </div>
                  <span className="count">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-card">
            <h3>Фільтрування</h3>
            <div className="filter-group">
              <label>За рейтингом:</label>
              <select 
                value={filterRating || ""} 
                onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Усі оцінки</option>
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating} ⭐</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Сортування:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Найновіші</option>
                <option value="oldest">Найстаріші</option>
                <option value="highest">Найвищі оцінки</option>
                <option value="lowest">Найнижчі оцінки</option>
              </select>
            </div>
          </div>
        </div>

        <div className="reviews-main">
          {sortedReviews.length === 0 ? (
            <div className="no-reviews">
              <p>Рецензій не знайдено</p>
            </div>
          ) : (
            <div className="reviews-list">
              {sortedReviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-info">
                      <h3 
                        className="book-title"
                        onClick={() => navigate(`/book/${review.book_id}`)}
                      >
                        {getBookTitle(review.book_id)}
                      </h3>
                      <p className="reviewer">{review.user_name || 'Анонімний користувач'}</p>
                    </div>
                    <div className="review-rating">
                      {'⭐'.repeat(review.rating || 0)}
                    </div>
                  </div>

                  <div className="review-content">
                    <p className="comment">{review.comment}</p>
                  </div>

                  <div className="review-footer">
                    <p className="review-date">
                      {new Date(review.created_at).toLocaleDateString('uk-UA')}
                    </p>
                    <button 
                      className="read-more"
                      onClick={() => navigate(`/book/${review.book_id}`)}
                    >
                      Переглянути книгу →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAuthenticated ? (
        <div className="cta-section">
          <p>Хочете поділитися своєю рецензією?</p>
          <button 
            className="write-review-btn"
            onClick={() => navigate("/books")}
          >
            Напишіть рецензію на книгу
          </button>
        </div>
      ) : (
        <div className="cta-section">
          <p>Щоб писати рецензії, потрібно увійти в акаунт</p>
          <button 
            className="login-btn"
            onClick={() => navigate("/auth")}
          >
            Увійти
          </button>
        </div>
      )}
    </div>
  );
}
