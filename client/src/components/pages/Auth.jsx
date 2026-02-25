import React, { useState } from "react";

export default function Auth() {

    return (
        <main className="auth">
            <div className="auth__header">
                <h1>Авторизація</h1>
                <form className="auth__content" onSubmit={onSubmit}>
                    <label htmlFor="username">Ім'я користувача чи електронна пошта:</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" id="username" name="username" required />
                    <label htmlFor="password">Пароль:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />
                    <br />
                    <button type="submit" disabled={login.isLoading}>Увійти</button>
                </form>
            </div>
            <ErrorModal error={error} onClose={() => setError(null)} />
        </main>
    );
}