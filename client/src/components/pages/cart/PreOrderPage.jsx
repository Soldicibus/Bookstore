import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/users";
import "./PreOrderPage.css";

export default function PreOrderPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  if (!isAuthenticated) {
    return (
      <div className="cart-container">
        <div className="auth-required">
          <h2>Для продовження потрібна авторизація</h2>
          <button onClick={() => navigate("/auth")} className="auth-btn">
            Увійти в акаунт
          </button>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemoveItem = (bookId) => {
    setCartItems(items => items.filter(item => item.id !== bookId));
  };

  const handleUpdateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(bookId);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    alert(`Замовлення оформлено!\n\nКількість книг: ${itemCount}\nСума: ${total} грн\n\nЦе демо-версія, тому замовлення не буде обробленим на сервері.`);
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <h1>Кошик покупок</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Кошик пустий</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate("/books")}
          >
            Продовжити покупки
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Книга</th>
                  <th>Ціна</th>
                  <th>Кількість</th>
                  <th>Сума</th>
                  <th>Дія</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="cart-item-row">
                    <td className="item-name">
                      <span 
                        className="title-link"
                        onClick={() => navigate(`/book/${item.id}`)}
                      >
                        {item.title}
                      </span>
                    </td>
                    <td className="item-price">{item.price} грн</td>
                    <td className="item-quantity">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="qty-input"
                      />
                    </td>
                    <td className="item-total">{(item.price * item.quantity).toFixed(2)} грн</td>
                    <td className="item-action">
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Підсумок замовлення</h2>
              
              <div className="summary-row">
                <span>Кількість товарів:</span>
                <span>{itemCount}</span>
              </div>
              
              <div className="summary-row">
                <span>Вартість:</span>
                <span>{total.toFixed(2)} грн</span>
              </div>
              
              <div className="summary-row shipping">
                <span>Доставка:</span>
                <span>Безкоштовна</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total">
                <span>Разом:</span>
                <span>{total.toFixed(2)} грн</span>
              </div>

              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Оформити замовлення
              </button>

              <button 
                className="continue-shopping-link"
                onClick={() => navigate("/books")}
              >
                ← Продовжити покупки
              </button>
            </div>

            <div className="info-card">
              <h3>ℹ️ Інформація</h3>
              <p>
                <strong>Ім'я:</strong> {user?.username}
              </p>
              <p>
                <strong>Доставка:</strong> За адресою в профілі
              </p>
              <p className="note">
                * Це демо-версія. Замовлення не буде обробленим на сервері.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
