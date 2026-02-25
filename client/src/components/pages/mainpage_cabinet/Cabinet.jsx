import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cabinet() {

    return (
        <main className="main">
            <div className="main__header">
                <h1>Особистий кабінет</h1>
            </div>
            <div className="main__content">
                <div className="card cabinet-info">
                    <h2>Інформація про користувача</h2>

                    <button>Вийти</button>

                </div>
            </div>
        </main>
    );
}