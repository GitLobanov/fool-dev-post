import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import HomePage from './pages/HomePage/HomePage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import BlogPage from './pages/BlogPage/BlogPage';
import InterviewPage from './pages/InterviewPage/InterviewPage';
import BlogPostPage from './pages/BlogPostPage/BlogPostPage';
import InterviewDetailPage from './pages/InterviewDetailPage/InterviewDetailPage';
import LearningSetsPage from './pages/LearningSetsPage/LearningSetsPage';
import LearningSetDetailPage from './pages/LearningSetDetailPage/LearningSetDetailPage';
import LoginPage from './pages/LoginPage/LoginPage'; // <-- Импортируем новую страницу
// import ProtectedRoute from './components/ProtectedRoute'; // Пока не используем, но понадобится
import './styles/global.css';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Функция, которую LoginPage вызовет при "успешном" входе
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        // В будущем здесь можно будет сохранять токен и данные пользователя
        console.log("Пользователь 'вошел'");
    };

    // Функция для выхода (понадобится позже)
    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    //     // Удалить токен из localStorage
    // };

    return (
        <Router>
            <Routes>
                {/* Маршрут для страницы входа */}
                {/* Она рендерится без основного макета (Navbar, Sidebars) */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn
                            ? <Navigate to="/" replace /> // Если уже залогинен, редирект на главную
                            : <LoginPage onLoginSuccess={handleLoginSuccess} />
                    }
                />

                {/* Маршрут для основного приложения */}
                {/* Используем "*" чтобы все остальные пути попадали сюда */}
                <Route
                    path="/*"
                    element={
                        isLoggedIn ? (
                            // Если залогинен, показываем основной макет
                            <MainAppLayout />
                        ) : (
                            // Если не залогинен, перенаправляем на /login
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

// Вынесем основной макет в отдельный компонент для чистоты
const MainAppLayout = () => {
    return (
        <> {/* Используем фрагмент, чтобы не добавлять лишний div */}
            <Navbar />
            <div className="page-container">
                <div className="main-layout">
                    <div className="left-sidebar-container">
                        <LeftSidebar />
                    </div>
                    <main className="main-content-area">
                        {/* Внутренние маршруты основного приложения */}
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            {/* Оставляем остальные маршруты здесь */}
                            <Route path="/create-post" element={<CreatePostPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:postId" element={<BlogPostPage />} />
                            <Route path="/interviews" element={<InterviewPage />} />
                            <Route path="/interviews/:interviewId" element={<InterviewDetailPage />} />
                            <Route path="/learning-sets" element={<LearningSetsPage />} />
                            <Route path="/learning-sets/:setId" element={<LearningSetDetailPage />} />

                            {/* Можно добавить маршрут для настроек, профиля и т.д. */}
                            {/* <Route path="/settings" element={<SettingsPage />} /> */}
                            {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}

                            {/* Маршрут по умолчанию или 404 внутри приложения */}
                            {/* <Route path="*" element={<NotFoundPage />} /> */}
                        </Routes>
                    </main>
                    <div className="right-sidebar-container">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;