import React from 'react';
// Используем NavLink для автоматического добавления active класса
import { NavLink } from 'react-router-dom';
// Иконки: дом, комменты, rss-лента, плюс/карандаш для создания, шестеренка, выход
import { FaHome, FaComments, FaRss, FaPlus, FaCog, FaUser } from 'react-icons/fa';
import './LeftSidebar.css';

const LeftSidebar = () => {
    // NavLink сам добавит класс 'active' по умолчанию
    const getLinkClass = ({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link';

    return (
        <aside className="left-sidebar">
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/" className={getLinkClass} end> {/* `end` для точного совпадения "/" */}
                            <FaHome className="nav-icon" /> Мой путь
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/interviews" className={getLinkClass}>
                            <FaComments className="nav-icon" /> Интервью
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog" className={getLinkClass}>
                            <FaRss className="nav-icon" /> Блог
                        </NavLink>
                    </li>
                    {/* Добавьте другие пункты */}
                </ul>
            </nav>

            <div className="sidebar-footer">
                {/* Ссылка на создание поста - теперь здесь и выделена */}
                <NavLink to="/create-post" className="sidebar-link publish-link">
                    <FaPlus className="nav-icon" /> Опубликовать пост
                </NavLink>

                <NavLink to="/settings" className="sidebar-link">
                    <FaCog className="nav-icon" /> Настройки
                </NavLink>

                {/* Ссылка на профиль пользователя */}
                <NavLink to="/profile/johndoe" className="sidebar-link profile-link">
                    <img src="https://via.placeholder.com/32" alt="User Avatar" className="profile-avatar" />
                    <span className="profile-name">John Doe</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default LeftSidebar;