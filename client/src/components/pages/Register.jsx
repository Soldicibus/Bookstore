import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRegister } from "../../hooks/users/mutations/useRegister";
import ErrorModal from "../common/ErrorModal";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const register = useRegister();

    useEffect(() => {
        // If already authenticated, redirect to cabinet
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/cabinet", { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError("Пароль повинен мати принаймні 6 символів");
            return;
        }

        try {
            const result = await register.mutateAsync({
                username,
                email,
                password,
            });

            if (result?.accessToken) {
                // Navigate to cabinet after successful registration
                navigate("/cabinet", { replace: true });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || "Registration failed";
            setError(errorMessage);
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <main className="auth">
            <div className="auth__header">
                <h1>Реєстрація</h1>
                <form className="auth__content" onSubmit={onSubmit}>
                    <label htmlFor="username">Ім'я користувача:</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        name="username"
                        required
                        disabled={register.isPending}
                    />
                    
                    <label htmlFor="email">Електронна пошта:</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={register.isPending}
                    />
                    
                    <label htmlFor="password">Пароль:</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        required
                        disabled={register.isPending}
                    />
                    
                    <label htmlFor="confirmPassword">Підтвердіть пароль:</label>
                    <input
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        disabled={register.isPending}
                    />
                    
                    <br />
                    <button type="submit" disabled={register.isPending}>
                        {register.isPending ? "Завантаження..." : "Зареєструватися"}
                    </button>
                </form>

                <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    Вже маєте акаунт? <a href="/auth">Увійти</a>
                </p>
            </div>
            <ErrorModal error={error} onClose={() => setError(null)} />
        </main>
    );
}
