import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/users/mutations/useLogin";
import ErrorModal from "../common/ErrorModal";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const login = useLogin();

    useEffect(() => {
        // If already authenticated, redirect to cabinet
        const token = localStorage.getItem("accessToken");
        if (token) {
            const from = location.state?.from?.pathname || "/cabinet";
            navigate(from, { replace: true });
        }
    }, [navigate, location]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const result = await login.mutateAsync({
                username: username || undefined,
                email: username || undefined, // Allow username/email in same field
                password,
            });

            if (result?.accessToken) {
                // Navigate to the page they came from or cabinet
                const from = location.state?.from?.pathname || "/cabinet";
                navigate(from, { replace: true });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || "Login failed";
            setError(errorMessage);
            setPassword(""); // Clear password on error
        }
    };

    return (
        <main className="auth">
            <div className="auth__header">
                <h1>Авторизація</h1>
                <form className="auth__content" onSubmit={onSubmit}>
                    <label htmlFor="username">Ім'я користувача чи електронна пошта:</label>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        name="username"
                        required
                        disabled={login.isPending}
                    />
                    <label htmlFor="password">Пароль:</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        required
                        disabled={login.isPending}
                    />
                    <br />
                    <button type="submit" disabled={login.isPending}>
                        {login.isPending ? "Завантаження..." : "Увійти"}
                    </button>
                </form>

                <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    Немаєте акаунту? <a href="/register">Зареєструватися</a>
                </p>
            </div>
            <ErrorModal error={error} onClose={() => setError(null)} />
        </main>
    );
}