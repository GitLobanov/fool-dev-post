import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import HomePage from './pages/HomePage/HomePage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
// Импортируем общие стили ПЕРЕД стилями компонентов/страниц
import './styles/global.css';
// Импорт стилей App если они есть (можно удалить если не нужны)
import './App.css';

function App() {
    return (
        <Router>
            <Navbar /> {/* Навбар всегда сверху */}
            <div className="page-container"> {/* Общий контейнер */}
                <div className="main-layout"> {/* Контейнер для 3 колонок */}
                    {/* Левый сайдбар */}
                    <div className="left-sidebar-container"> {/* Обертка для скрытия на мобилке */}
                        <LeftSidebar />
                    </div>

                    {/* Основная область контента */}
                    <main className="main-content-area">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/create-post" element={<CreatePostPage />} />
                            {/* Добавьте другие роуты: /interviews, /blog, /settings, /profile/:userId и т.д. */}
                            {/* <Route path="/settings" element={<SettingsPage />} /> */}
                            {/* <Route path="*" element={<NotFoundPage />} /> */}
                        </Routes>
                    </main>

                    {/* Правый сайдбар (можно сделать его зависимым от роута) */}
                    <div className="right-sidebar-container"> {/* Обертка для скрытия на мобилке */}
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;