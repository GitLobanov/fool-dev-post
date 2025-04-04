import React from 'react';
import { Link } from 'react-router-dom'; // Используем Link для навигации
import { FaSearch, FaFeatherAlt } from 'react-icons/fa'; // Иконка для создания поста
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container page-container"> {/* Используем общий контейнер */}
                <Link to="/" className="navbar-logo">
                    fool.dev.post {/* Или ваш логотип */}
                </Link>

                <div className="navbar-search">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="navbar-actions">
                    {/* Ссылка на создание поста, теперь здесь */}
                    {/*<Link to="/create-post" className="navbar-create-btn">*/}
                    {/*    <FaFeatherAlt /> <span>Создать пост</span>*/}
                    {/*</Link>*/}
                    {/* Можно добавить иконку уведомлений, профиль */}
                    {/* <button className="icon-button"><FaBell /></button> */}
                    {/* <img src="https://via.placeholder.com/32" alt="User" className='navbar-profile-img' /> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;