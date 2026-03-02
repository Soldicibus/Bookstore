import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook, useIsFavorite, useAddFavorites, useRemoveFavorites, useIsFavorites, useFavoriteBooks } from "../../../hooks/books";
import { useReviews } from "../../../hooks/reviews";
import { useAuth } from "../../../hooks/users";
import { getBookCover } from "../../../utils/bookUtils";
import "./OneBookView.css";

export default function OneBookView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const { data: book, isLoading: bookLoading } = useBook(id);
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();
  const isFavorite = useIsFavorite(parseInt(id));
  const addFavMutation = useAddFavorites();
  const removeFavMutation = useRemoveFavorites();
  
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Debug: Log book data
  React.useEffect(() => {
    if (book) {
      console.log("Book data:", book);
      console.log("Book description:", book.description);
    }
  }, [book]);

  const bookReviews = React.useMemo(() => {
    // Get reviews from API
    const apiReviews = Array.isArray(reviews) 
      ? reviews.filter(r => r.book_id === parseInt(id) || r.bookId === parseInt(id))
      : [];
    
    // Get demo reviews from localStorage
    const storedReviews = localStorage.getItem("reviews");
    const demoReviews = storedReviews 
      ? JSON.parse(storedReviews).filter(r => r.book_id === parseInt(id))
      : [];
    
    // Combine both
    return [...apiReviews, ...demoReviews];
  }, [reviews, id]);
  const avgRating = bookReviews.length > 0
    ? (bookReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / bookReviews.length).toFixed(1)
    : 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    try {
      // Demo implementation: Store in localStorage
      const cart = localStorage.getItem("cart");
      const cartItems = cart ? JSON.parse(cart) : [];
      
      const existingItem = cartItems.find(item => item.id === book.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({
          id: book.id,
          title: book.title,
          price: book.price,
          cover_url: book.cover_url,
          quantity: quantity
        });
      }
      
      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert(`Додано ${quantity} копій "${book?.title}" до кошика`);
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Помилка при додаванні до кошика");
    }
  };

  const isFavoriteBook = useIsFavorites(parseInt(id), user.id || user.userId || user.sub);
  const {data: favorites = []} = useFavoriteBooks(user.id);
  console.log(`Favorites for user ${user.id}:`, favorites);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated || !user) {
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

  const handleAddReview = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (!reviewText.trim()) {
      alert("Напишіть рецензію");
      return;
    }

    setIsSubmittingReview(true);
    try {
      // Demo implementation: Store in localStorage
      const storedReviews = localStorage.getItem("reviews");
      const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
      
      const newReview = {
        id: Date.now(),
        book_id: parseInt(id),
        user_id: user?.id || 1,
        user_name: user?.username || 'Користувач',
        rating: rating,
        comment: reviewText,
        created_at: new Date().toISOString()
      };
      
      allReviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(allReviews));
      
      setReviewText("");
      setRating(5);
      alert("Рецензія додана!");
      
      // In a real app, you would refetch reviews here
      // For demo, just refresh the page to see changes
      window.location.reload();
    } catch (error) {
      console.error("Error creating review:", error);
      alert("Помилка при додаванні рецензії");
    } finally {
      setIsSubmittingReview(false);
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
          {book.cover_url || book.title ? (
            <img src={getBookCover(book)} alt={book.title} className="book-cover-large" />
          ) : (
            <div className="cover-placeholder">Без обкладинки</div>
          )}
        </div>

        <div className="book-details-section">
          <h1>{book.title}</h1>
          
          <div className="book-meta">
            {book.author && <p className="author"><strong>Автор:</strong> {book.author}</p>}
            {book.publisher && <p className="publisher"><strong>Видавництво:</strong> {book.publisher}</p>}
            {book.publisher_id && !book.publisher && <p className="publisher"><strong>ID Видавництва:</strong> {book.publisher_id}</p>}
            {book.publication_year && <p className="year"><strong>Рік видання:</strong> {book.publication_year}</p>}
            {book.page_amount && <p className="pages"><strong>Сторінок:</strong> {book.page_amount}</p>}
            {book.isbn && <p className="isbn"><strong>ISBN:</strong> {book.isbn}</p>}
            {book.language && <p className="language"><strong>Мова:</strong> {book.language === 'UKR' ? 'Українська' : book.language === 'ENG' ? 'Англійська' : book.language}</p>}
            {book.quantity !== undefined && <p className="quantity"><strong>На складі:</strong> {book.quantity > 0 ? `${book.quantity} копій` : 'Немає в наявності'}</p>}
            {book.sale_status && <p className="sale-status"><strong>Статус:</strong> {book.sale_status}</p>}
          </div>

          <div className="rating-section">
            <p className="rating">⭐ {avgRating} / 5 ({bookReviews.length} рецензій)</p>
          </div>

          <div className="price-section">
            <p className="price">{book.price ? `${parseFloat(book.price).toFixed(2)} грн` : '💰 Ціна не вказана'}</p>
            {book.quantity === 0 && <p className="out-of-stock">⚠️ Немає в наявності</p>}
          </div>

          {book.description && (
            <div className="description">
              <h3>Опис</h3>
              <p>{book.description}</p>
            </div>
          )}

          {!book.description && (
            <div className="description">
              <h3>Опис</h3>
              <p>Опис не доступний для цієї книги.</p>
            </div>
          )}

          {book.genres && Array.isArray(book.genres) && book.genres.length > 0 && (
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
                max={book.quantity || 100}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                disabled={book.quantity === 0}
              />
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={book.quantity === 0}
            >
              {book.quantity === 0 ? 'Немає в наявності' : 'Додати в кошик'}
            </button>
            <button 
              className={`favorite-btn ${isFavoriteBook ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              disabled={addFavMutation.isPending || removeFavMutation.isPending}
              title={isFavoriteBook ? 'Видалити з улюблених' : 'Додати в улюблені'}
            >
              {isFavoriteBook ? '❤️' : '🤍'} Улюблене
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
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? "Додавання..." : "Додати рецензію"}
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
