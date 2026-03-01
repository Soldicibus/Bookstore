import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/users";
import "./Cabinet.css";

export default function Cabinet() {
    const navigate = useNavigate();
    const { user, logout, isLoggingOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <main className="cabinet-main">
            <div className="cabinet-header">
                <h1>Особистий кабінет</h1>
            </div>

            <div className="cabinet-content">
                <div className="cabinet-grid">
                    {/* User Info Card */}
                    <div className="card cabinet-card">
                        <h2>👤 Інформація про користувача</h2>
                        <div className="user-info">
                            <div className="info-row">
                                <span className="label">Ім'я користувача:</span>
                                <span className="value">{user?.username || 'Не завантажено'}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Email:</span>
                                <span className="value">{user?.email || 'Не завантажено'}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Статус:</span>
                                <span className="value">
                                    <span className="status-badge">Активний</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="card cabinet-card clickable" onClick={() => navigate("/orders")}>
                        <h2>📦 Мої замовлення</h2>
                        <p className="card-description">Переглянути історію замовлень</p>
                        <button className="card-btn">Перейти →</button>
                    </div>

                    {/* Favorites Card */}
                    <div className="card cabinet-card clickable" onClick={() => navigate("/favorites")}>
                        <h2>❤️ Улюблені книги</h2>
                        <p className="card-description">Переглянути улюблені книги</p>
                        <button className="card-btn">Перейти →</button>
                    </div>

                    {/* Shopping Card */}
                    <div className="card cabinet-card clickable" onClick={() => navigate("/cart")}>
                        <h2>🛒 Кошик покупок</h2>
                        <p className="card-description">Перейти до кошика</p>
                        <button className="card-btn">Перейти →</button>
                    </div>

                    {/* Reviews Card */}
                    <div className="card cabinet-card clickable" onClick={() => navigate("/reviews")}>
                        <h2>⭐ Рецензії на книги</h2>
                        <p className="card-description">Переглянути всі рецензії</p>
                        <button className="card-btn">Перейти →</button>
                    </div>

                    {/* Books Card */}
                    <div className="card cabinet-card clickable" onClick={() => navigate("/books")}>
                        <h2>📚 Книги</h2>
                        <p className="card-description">Переглянути каталог книг</p>
                        <button className="card-btn">Перейти →</button>
                    </div>
                </div>

                {/* Settings Card */}
                <div className="card settings-card">
                    <h2>⚙️ Налаштування</h2>
                    <div className="settings-content">
                        <button className="settings-btn" onClick={() => alert("Змінення пароля ще не реалізовано")}>
                            Змінити пароль
                        </button>
                        <button className="settings-btn" onClick={() => alert("Редагування профілю ще не реалізовано")}>
                            Редагувати профіль
                        </button>
                        <button 
                            className="logout-btn"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? "Виходу..." : "Вийти"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}