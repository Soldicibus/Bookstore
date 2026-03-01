import React from "react";
import { useAuth } from "../../../hooks/users";
import { useNavigate } from "react-router-dom";
import "./AllOrders.css";

export default function AllOrders() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Demo data - in real app, this would be from useOrders() hook
  const demoOrders = [
    {
      id: 1,
      order_number: "ORD-001",
      total_price: 299.99,
      status: "delivered",
      created_at: "2026-02-15",
      items: [
        { id: 1, title: "Книга 1", price: 99.99 },
        { id: 2, title: "Книга 2", price: 200.00 }
      ]
    },
    {
      id: 2,
      order_number: "ORD-002",
      total_price: 149.99,
      status: "processing",
      created_at: "2026-02-28",
      items: [
        { id: 3, title: "Книга 3", price: 149.99 }
      ]
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className="orders-container">
        <div className="auth-required">
          <h2>Для перегляду замовлень потрібна авторизація</h2>
          <button onClick={() => navigate("/auth")} className="auth-btn">
            Увійти в акаунт
          </button>
        </div>
      </div>
    );
  }

  const getStatusLabel = (status) => {
    const labels = {
      processing: "На обробці",
      shipped: "Відправлено",
      delivered: "Доставлено",
      cancelled: "Скасовано"
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Мої замовлення</h1>
        <p className="user-info">Користувач: {user?.username}</p>
      </div>

      {demoOrders.length === 0 ? (
        <div className="empty-orders">
          <p>У вас ще немає замовлень</p>
          <button 
            className="shop-btn"
            onClick={() => navigate("/books")}
          >
            Перейти до магазину
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {demoOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-number">Замовлення #{order.order_number}</h3>
                  <p className="order-date">
                    Дата: {new Date(order.created_at).toLocaleDateString('uk-UA')}
                  </p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusLabel(order.status)}
                </div>
              </div>

              <div className="order-items">
                <h4>Товари в замовленні:</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>
                      <span className="item-title">{item.title}</span>
                      <span className="item-price">{item.price} грн</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Разом:</span>
                  <strong>{order.total_price} грн</strong>
                </div>
                <button 
                  className="details-btn"
                  onClick={() => alert(`Це демо-версія. Детальна інформація про замовлення #${order.order_number} недоступна.`)}
                >
                  Деталі
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="demo-notice">
        <p>
          ℹ️ <strong>Демо-версія:</strong> Показано приклади замовлень. 
          У виробничій версії замовлення завантажуватимуться з сервера.
        </p>
      </div>
    </div>
  );
}
