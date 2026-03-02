import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/users";
import "../mainpage_cabinet/Homepage.css";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");

  // Get cart count from localStorage
  const cartCount = useMemo(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) return 0;
    try {
      const cartItems = JSON.parse(cart);
      return Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
    } catch {
      return 0;
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  const handleFavoritesClick = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/favorites");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <header className="header">
      <div className="header-content">
        <div 
          className="logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">
            <img src="/misc/EKnyga Logo.png" alt="EKnyga Logo" />
          </span>
          <span className="logo-text">EKnyha</span>
        </div>

        <form className="search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Я шукаю..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Знайти</button>
        </form>

        <div className="header-icons">
          <button 
            className="icon-btn notification-btn"
            title="Сповіщення"
            onClick={() => alert("Сповіщення наразі недоступні")}
          >
            🔔
          </button>
          
          <button 
            className="icon-btn favorites-btn"
            title={user ? "Мої улюблені" : "Вхід для улюблених"}
            onClick={handleFavoritesClick}
          >
            🤍
            {user && <span className="icon-label">Улюблені</span>}
          </button>
          
          <button 
            className="icon-btn cart-btn"
            onClick={handleCartClick}
            title="Кошик"
          >
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <span className="icon-label">Кошик</span>
          </button>

          <button 
            className="icon-btn profile-btn"
            title={user ? "Профіль" : "Вхід"}
            onClick={() => {
              if (user) {
                navigate("/cabinet");
              } else {
                navigate("/auth");
              }
            }}
          >
            {user ? <span className="icon-label">👥Профіль</span> : <span className="icon-label">Вхід</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
