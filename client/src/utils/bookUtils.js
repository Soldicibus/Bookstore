/**
 * Get the full author name from author object
 * @param {Object} author - Author object with name, surname, patronym properties
 * @returns {string} Full author name
 */
export function getFullAuthorName(author) {
  if (!author) return "Невідомий автор";
  
  const parts = [author.name, author.surname, author.patronym].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Невідомий автор";
}

/**
 * Get book cover image URL with fallback logic
 * @param {Object} book - Book object
 * @returns {string} Cover image URL
 */
export function getBookCover(book) {
  if (!book) {
    // Default fallback cover
    return "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093";
  }

  // Special covers for specific books by title
  const specialCovers = {
    "Кобзар": "https://glagoslav.com/wp-content/uploads/2019/10/Shevchenko_Kobzar_website.jpg",
    "Маруся Чурай": "https://images.prom.ua/3507557275_w1280_h640_marusya-churaj.jpg",
    "Лісова пісня": "https://m.media-amazon.com/images/I/61XK3-ppQFL._AC_UF1000,1000_QL80_.jpg"
  };

  // Check for special covers by title
  if (book.title && specialCovers[book.title]) {
    return specialCovers[book.title];
  }

  // Check for custom cover_url from database
  if (book.cover_url) {
    return book.cover_url;
  }

  // Random covers for fallback - deterministic based on book ID
  const randomCovers = [
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093",
    "https://edit.org/images/cat/book-covers-big-2019101610.jpg",
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/kindle-book-cover-design-template-eddc9ffdbe03c874f35dfb20694f87fd_screen.jpg?ts=1706419827",
    "https://img.wattpad.com/cover/57258457-288-k474609.jpg",
    "https://bellamediamanagement.com/wp-content/uploads/2021/05/ebook-2.jpg"
  ];

  // Deterministic assignment based on book ID - ensure book.id is valid
  if (!book.id) {
    return randomCovers[0];
  }
  
  const index = (parseInt(book.id) % randomCovers.length);
  return randomCovers[index];
}

/**
 * Format book data for display
 * @param {Object} book - Raw book object from API
 * @returns {Object} Formatted book object
 */
export function formatBookData(book) {
  return {
    ...book,
    displayTitle: book.title || "Без назви",
    displayPrice: book.price ? `${book.price} грн` : "Ціна не вказана",
    displayRating: book.rating ? book.rating.toFixed(1) : null,
    coverUrl: getBookCover(book)
  };
}

/**
 * Sort books by various criteria
 * @param {Array} books - Array of book objects
 * @param {string} sortBy - Sort criteria: 'newest', 'title-asc', 'title-desc', 'price-asc', 'price-desc', 'rating'
 * @returns {Array} Sorted books array
 */
export function sortBooks(books, sortBy) {
  const sorted = [...books];
  
  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    case "title-asc":
      return sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    case "title-desc":
      return sorted.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    case "price-asc":
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case "price-desc":
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
}

/**
 * Filter books by search term
 * @param {Array} books - Array of book objects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered books
 */
export function filterBooksBySearch(books, searchTerm) {
  if (!searchTerm) return books;
  
  const term = searchTerm.toLowerCase();
  return books.filter(book =>
    (book.title && book.title.toLowerCase().includes(term)) ||
    (book.description && book.description.toLowerCase().includes(term))
  );
}
