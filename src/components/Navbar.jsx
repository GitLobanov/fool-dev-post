import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Главная</Link>
            <Link to="/create-post">Создать пост</Link>
            <Link to="/authors">Авторы</Link>
            <Link to="/register">Регистрация</Link>
            <Link to="/login">Вход</Link>
        </nav>
    );
};

export default Navbar;