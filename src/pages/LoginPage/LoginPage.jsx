// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Импортируем стили

// Принимаем onLoginSuccess как проп
const LoginPage = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Упрощенный обработчик для кнопки
    const handleLoginClick = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы, если это <form>
        console.log('Попытка входа с:', { username, password }); // Оставим лог для отладки

        // 1. Вызываем колбэк, сообщая App, что вход "успешен"
        onLoginSuccess();

        // 2. Переходим на главную страницу
        navigate('/');
    };

    return (
        <div className="login-page">
            {/* Используем div или form, onSubmit на form тоже сработает */}
            <form className="login-form" onSubmit={handleLoginClick}>
                <h1>Вход</h1>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Имя пользователя (пока не используется)"
                    required // Можно оставить базовую валидацию
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль (пока не используется)"
                    required
                />
                {/* Кнопка теперь просто вызывает handleLoginClick */}
                <button type="submit">Войти</button>
                {/* Можно добавить ссылку на регистрацию, если нужно */}
                {/* <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p> */}
            </form>
        </div>
    );
};

export default LoginPage;