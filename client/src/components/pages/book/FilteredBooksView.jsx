import React, { useState, useMemo } from "react";
import { useBooks, useBooksByGenre, useBooksByThematic, useBooksByAuthor } from "../../../hooks/books";
import { useGenres } from "../../../hooks/genres";
import { useAuthors } from "../../../hooks/authors";
import { useThemes } from "../../../hooks/themes";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import { getBookCover, getFullAuthorName, sortBooks } from "../../../utils/bookUtils";
import "./FilteredBooksView.css";

export default function FilteredBooksView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialSearchQuery = searchParams.get("search") || "";
  const initialGenreId = searchParams.get("genre");
  const [selectedGenre, setSelectedGenre] = useState(initialGenreId ? parseInt(initialGenreId) : null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch all books and filtered books based on selections
  const { data: booksData = {}, isLoading: booksLoading } = useBooks();
  const { data: genreData = {}, isLoading: genreLoading } = useBooksByGenre(selectedGenre);
  const { data: authorData = {}, isLoading: authorLoading } = useBooksByAuthor(selectedAuthor);
  const { data: thematicData = {}, isLoading: thematicLoading } = useBooksByThematic(selectedTheme);
  
  const allBooks = Array.isArray(booksData) ? booksData : (booksData.books || []);
  const genreBooks = Array.isArray(genreData) ? genreData : (genreData.books || []);
  const authorBooks = Array.isArray(authorData) ? authorData : (authorData.books || []);
  const thematicBooks = Array.isArray(thematicData) ? thematicData : (thematicData.books || []);
  
  const { data: genres = [], isLoading: genresLoading } = useGenres();
  const { data: authorsData = [], isLoading: authorsLoading } = useAuthors();
  const { data: themes = [], isLoading: themesLoading } = useThemes();
  
  // Ensure authors is always an array
  const authors = Array.isArray(authorsData) ? authorsData : (authorsData.authors || []);

  const filteredBooks = useMemo(() => {
    let result = allBooks;
    
    // If multiple filters are selected, find books that match ALL filters
    const activeFilters = [];
    if (selectedGenre) activeFilters.push('genre');
    if (selectedAuthor) activeFilters.push('author');
    if (selectedTheme) activeFilters.push('theme');

    if (activeFilters.length > 1) {
      // Multiple filters: find intersection of books matching ALL filters
      const genreBookIds = selectedGenre 
        ? new Set(genreBooks.map(b => b.id)) 
        : null;
      
      const authorBookIds = selectedAuthor 
        ? new Set(authorBooks.map(b => b.id)) 
        : null;
      
      const themeBookIds = selectedTheme 
        ? new Set(thematicBooks.map(b => b.id)) 
        : null;

      result = allBooks.filter((book) => {
        if (genreBookIds && !genreBookIds.has(book.id)) return false;
        if (authorBookIds && !authorBookIds.has(book.id)) return false;
        if (themeBookIds && !themeBookIds.has(book.id)) return false;
        return true;
      });
    } else if (selectedGenre) {
      // Single filter: genre only
      result = genreBooks;
    } else if (selectedAuthor) {
      // Single filter: author only
      result = authorBooks;
    } else if (selectedTheme) {
      // Single filter: thematic only
      result = thematicBooks;
    }
    
    // Apply additional client-side filtering (search)
    result = result.filter((book) => {
      const matchesSearch = !searchQuery || 
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });

    // Sort books
    switch (sortBy) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [allBooks, genreBooks, authorBooks, thematicBooks, searchQuery, sortBy, selectedGenre, selectedAuthor, selectedTheme]);

  const isLoading = booksLoading || genresLoading || authorsLoading || themesLoading || genreLoading || authorLoading || thematicLoading;

  if (isLoading) {
    return <div className="filtered-books-container">Завантаження...</div>;
  }

  return (
    <div className="filtered-books-container">
      <div className="filter-section">
        <h2>Фільтрування та сортування</h2>
        
        <div className="filter-group">
          <input
            type="text"
            placeholder="Пошук за назвою або автором..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-books"
          />
        </div>

        <div className="filter-group">
          <h3>Сортування</h3>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Найновіші</option>
            <option value="title-asc">Назва (А-Я)</option>
            <option value="title-desc">Назва (Я-А)</option>
            <option value="price-asc">Ціна (низька → висока)</option>
            <option value="price-desc">Ціна (висока → низька)</option>
            <option value="rating">Рейтинг</option>
          </select>
        </div>

        <div className="filter-group">
          <h3>Жанри</h3>
          <div className="genre-list">
            <button
              className={`filter-btn ${!selectedGenre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(null)}
            >
              Всі жанри
            </button>
            {Array.isArray(genres) && genres.map((genre) => (
              <button
                key={genre.id}
                className={`filter-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Автори</h3>
          <div className="author-list">
            <button
              className={`filter-btn ${!selectedAuthor ? 'active' : ''}`}
              onClick={() => setSelectedAuthor(null)}
            >
              Всі автори
            </button>
            {Array.isArray(authors) && authors.map((author) => {
              const fullName = [author.name, author.surname, author.patronym]
                .filter(Boolean)
                .join(' ');
              return (
                <button
                  key={author.id}
                  className={`filter-btn ${selectedAuthor === author.id ? 'active' : ''}`}
                  onClick={() => setSelectedAuthor(author.id)}
                >
                  {fullName || author.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter-group">
          <h3>Тематика</h3>
          <div className="theme-list">
            <button
              className={`filter-btn ${!selectedTheme ? 'active' : ''}`}
              onClick={() => setSelectedTheme(null)}
            >
              Вся тематика
            </button>
            {Array.isArray(themes) && themes.map((theme) => (
              <button
                key={theme.id}
                className={`filter-btn ${selectedTheme === theme.id ? 'active' : ''}`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="books-grid">
        <div className="books-header">
          <h2>Книги ({filteredBooks.length})</h2>
          {(selectedGenre || selectedAuthor || selectedTheme || searchQuery) && (
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSelectedGenre(null);
                setSelectedAuthor(null);
                setSelectedTheme(null);
                setSearchQuery("");
                setSortBy("newest");
              }}
            >
              Очистити фільтри
            </button>
          )}
        </div>

        {filteredBooks.length === 0 ? (
          <div className="empty-state">
            <p>Книги не знайдені за вашими критеріями</p>
            <button 
              className="reset-btn"
              onClick={() => {
                setSelectedGenre(null);
                setSelectedAuthor(null);
                setSelectedTheme(null);
                setSearchQuery("");
                setSortBy("newest");
              }}
            >
              Скинути все
            </button>
          </div>
        ) : (
          <div className="books-list">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
